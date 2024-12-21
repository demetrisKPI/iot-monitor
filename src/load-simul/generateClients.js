const { createMqttClient } = require('../device/gateway/mqttClient.js');

const { nanoid } = require('../util/helpers.js');

const generateClients = async (num) => {
  const deviceNames = [];

  for (let i = 0; i < num; i++) {
    const deviceName = `device_${nanoid()}`;
    deviceNames.push(deviceName);
  }

  const clients = await Promise.all(
    deviceNames.map(async (name) => {
      const client = await createMqttClient(name);

      return { client, name };
    }),
  );

  return clients;
};

module.exports = { generateClients };
