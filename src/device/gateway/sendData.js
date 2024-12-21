const { publish } = require('./mqttClient.js');

const publishSensorLog = async (log) => {
  const message = JSON.stringify(log);
  const deviceName = log && log.device ? log.device : '';

  const topic = `${deviceName}/log`;

  const response = await publish({ topic, message });

  return response;
};

module.exports = { publishSensorLog };
