require('dotenv').config({ silent: true });

const client = require('./mqtt.js');
const logger = require('../../util/logger.js');
const { nanoid } = require('../../util/helpers.js');

const testClient = client.createMqttClient(nanoid());

if (testClient.connected) {
  logger.info('MQTT device manager up and running');
} else {
  logger.error('MQTT device manager not connected!');
}
