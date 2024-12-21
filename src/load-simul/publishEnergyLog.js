const {
  generateSensorData,
} = require('../device/sensor/generateSensorData.js');

const logger = require('../util/logger.js');
const { SENSOR_DATA_INTERVAL_SECONDS } = require('../util/constants.js');

const publishEnergyLog = ({ client, name }) => {
  const sensorData = generateSensorData({
    deviceName: name,
    intervalTime: SENSOR_DATA_INTERVAL_SECONDS,
  });

  const message = JSON.stringify(sensorData);
  const topic = `${name}/log`;

  client
    .publish(topic, message, { qos: process.env.MQTT_QOS })
    .then(() => {
      logger.info(`${name} published data:`, sensorData);
    })
    .catch((err) => {
      logger.error(`${name} failed to publish data:`, err);
    });
};

module.exports = { publishEnergyLog };
