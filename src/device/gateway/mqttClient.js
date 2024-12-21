require('dotenv').config({ silent: true });

const asyncMqtt = require('async-mqtt');

const logger = require('../../util/logger.js');
const { nanoid } = require('../../util/helpers.js');

const { BROKER_URL, MQTT_USER, MQTT_PASSWORD, MQTT_QOS, NODE_APP_INSTANCE } =
  process.env;

const client = asyncMqtt.connect(BROKER_URL, {
  username: MQTT_USER,
  password: MQTT_PASSWORD,
  clean: true,
  connectTimeout: 5000,
  clientId: `${NODE_APP_INSTANCE}_${nanoid()}`,
});

client.on('connect', () => {
  logger.info('Connected to MQTT broker');
  client.end();
});

client.on('error', (err) => {
  logger.error('Connection error:', err.message);
});

client.on('offline', () => {
  logger.info('MQTT client went offline');
});

const publish = async ({ message, topic, qos = 0 }) => {
  const publisherId = topic.split('/')[0];

  try {
    const response = await client.publish(topic, message, {
      qos: qos || MQTT_QOS,
    });

    logger.info(`Successfully published message ${message} to topic ${topic}`);

    return {
      response,
      publisherId,
      status: `Successfully published message ${message} to topic ${topic}`,
    };
  } catch (error) {
    logger.info(
      { error },
      `Failed to publish message ${message} to topic ${topic}`,
    );

    return Promise.reject(
      new Error(
        `Failed to publish message ${message} to topic ${topic}. Error: ${error}`,
      ),
    );
  }
};

module.exports = {
  client,
  publish,
};
