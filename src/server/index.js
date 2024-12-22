const deviceManager = require('./mqtt.js');

const logger = require('../util/logger.js');

const { client } = deviceManager.start();

if (client.connected) {
  logger.info('MQTT device manager up and running');
} else {
  logger.error('MQTT device manager not connected!');
}
