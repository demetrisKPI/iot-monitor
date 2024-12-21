require('dotenv').config({ silent: true });

const { createServer } = require('net');
const aedes = require('aedes');
const mqemitter = require('mqemitter-redis');
const logging = require('aedes-logging');
const persistence = require('aedes-persistence-redis');

const logger = require('../util/logger.js');

const { REDIS_CONFIG, SUBTOPICS } = require('../util/constants.js');

const { MQTT_USER, MQTT_PASSWORD, BROKER_PORT } = process.env;

const port = BROKER_PORT || 1883;

const getClientRole = ({ username, password }) => {
  if (username === MQTT_USER && password === MQTT_PASSWORD) {
    return 'admin';
  }

  return '';
};

const authenticate = (client, username, password, callback) => {
  const pwd = Buffer.from(password, 'base64').toString();
  const role = getClientRole({ username, password: pwd });

  client.auth = { role, username };

  logger.info(client.auth, 'authenticate');

  callback(null, !!role);
};

const authorizePublish = (client, packet, callback) => {
  const { username, role } = client.auth;
  const { topic } = packet;

  const subtopic = topic.split('/')[1];

  logger.info({ username, role, topic, subtopic }, 'authorizePublish');

  callback(null);
};

const authorizeSubscribe = (client, subscription, callback) => {
  const { username, role } = client.auth;
  const { topic } = subscription;

  const subtopic = topic.split('/')[1];

  logger.info({ username, role, topic, subtopic }, 'authorizeSubscribe');

  callback(null, subscription);
};

const start = () => {
  const mq = mqemitter(REDIS_CONFIG);

  const broker = aedes({
    mq,
    persistence: persistence(REDIS_CONFIG),
    concurrency: 5000,
    heartbeatInterval: 60000,
    connectTimeout: 30000,
    authenticate,
    authorizePublish,
    authorizeSubscribe,
  });

  logging({
    instance: broker,
  });

  broker.on('publish', async (packet) => {
    const { topic, payload } = packet;
    const message = payload.toString();

    logger.info({ topic, message }, 'publish');
  });

  broker.on('clientError', (client, err) => {
    if (client) {
      logger.info(
        { clientId: client.id, errorMessage: err.message },
        'clientError',
      );
    }
  });

  broker.on('subscribe', (subscriptions, client) => {
    if (client) {
      logger.info({ subscriptions, clientId: client.id }, 'subscribe');
    }
  });

  broker.on('client', (client) => {
    logger.info({ clientId: client.id }, 'new client');
  });

  broker.on('clientReady', (client) => {
    const { username, role } = client.auth;
    logger.info({ clientId: client.id, username, role }, 'clientReady');
  });

  broker.on('clientDisconnect', (client) => {
    logger.info({ clientId: client.id }, 'clientDisconnect');
  });

  const server = createServer(broker.handle);

  server.listen(port, () => {
    logger.info('MQTT server started and listening on port %d', port);
  });

  return { broker, server };
};

module.exports = { start };
