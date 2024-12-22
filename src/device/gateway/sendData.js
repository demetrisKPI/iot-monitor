const { publish } = require('../../lib/mqtt.js');

const publishSensorLog = async ({ client, log }) => {
  const message = JSON.stringify(log);
  const deviceName = log && log.device ? log.device : '';

  const topic = `${deviceName}/log`;

  const response = await publish({ client, topic, message });

  return response;
};

module.exports = { publishSensorLog };
