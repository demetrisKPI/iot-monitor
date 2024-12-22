const { createServer } = require('net');
const asyncMqtt = require('async-mqtt');

const logger = require('../util/logger.js');

const {
  MQTT_ADMIN_USER,
  MQTT_ADMIN_PASSWORD,
  BROKER_URL,
  NODE_APP_INSTANCE,
  DEVICE_MANAGER_PORT,
} = process.env;

const port = DEVICE_MANAGER_PORT || 8883;

const start = () => {
  const client = asyncMqtt.connect(BROKER_URL, {
    username: MQTT_ADMIN_USER,
    password: MQTT_ADMIN_PASSWORD,
    clean: true,
    connectTimeout: 5000,
    clientId: `device_manager__${NODE_APP_INSTANCE}`,
  });

  client.on('connect', () => {
    logger.info('Connected to MQTT broker');
  });

  client.on('error', (err) => {
    logger.error('Connection error:', err.message);
  });

  client.on('offline', () => {
    logger.info('MQTT client went offline');
  });

  client.on('close', () => {
    logger.info('MQTT client Disconnected');
  });

  // handle incoming messages
  client.on('message', (topic, message, packet) => {
    logger.info(
      { topic, packet, message: message.toString() },
      'Device manager received MQTT message',
    );

    if (topic.includes('log')) {
      // do stuff
    }
  });

  const server = createServer(client.handle);

  server.listen(port, () => {
    logger.info('MQTT server started and listening on port %d', port);
  });

  return { client, server };
};

module.exports = { start };
