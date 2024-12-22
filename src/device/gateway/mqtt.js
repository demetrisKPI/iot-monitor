const asyncMqtt = require('async-mqtt');

const logger = require('../../util/logger.js');

const {
  BROKER_URL,
  MQTT_DEVICE_USER,
  MQTT_DEVICE_PASSWORD,
  NODE_APP_INSTANCE,
} = process.env;

const createMqttClient = (deviceName) => {
  const client = asyncMqtt.connect(BROKER_URL, {
    username: MQTT_DEVICE_USER,
    password: MQTT_DEVICE_PASSWORD,
    clean: true,
    connectTimeout: 5000,
    clientId: `${NODE_APP_INSTANCE}_${deviceName}`,
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

  return client;
};

module.exports = { createMqttClient };
