require('dotenv').config({ silent: true });

const asyncMqtt = require('async-mqtt');

const logger = require('../../util/logger.js');

const { BROKER_URL, MQTT_USER, MQTT_PASSWORD, NODE_APP_INSTANCE } = process.env;

const createMqttClient = async (deviceName) => {
  const client = await asyncMqtt.connect(BROKER_URL, {
    username: MQTT_USER,
    password: MQTT_PASSWORD,
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
