const client = require('./mqtt.js');
const logger = require('../../util/logger.js');

const testClient = client.createMqttClient('test_device');

if (testClient.connected) {
  logger.info('MQTT device manager up and running');
} else {
  logger.error('MQTT device manager not connected!');
}
