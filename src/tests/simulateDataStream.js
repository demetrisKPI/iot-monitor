require('dotenv').config({ silent: true });
const { subToTopic } = require('../lib/mqtt.js');

//start broker
require('../broker/index.js');

//start device manager
const deviceManager = require('../server/index.js');

const { SENSOR_DATA_INTERVAL_SECONDS } = require('../util/constants.js');
const { generateClients } = require('../load-simul/generateClients.js');
const { publishEnergyLog } = require('../load-simul/publishEnergyLog.js');

let clients;

const testDataStream = async ({ numberOfClients }) => {
  clients = await generateClients(numberOfClients);

  clients.forEach(({ client, name }) => {
    setInterval(() => {
      publishEnergyLog({ client, name });
      // subscribe device manager to topic 'test_device/log'
      subToTopic({ client: deviceManager, topicName: `${name}/log` });
    }, SENSOR_DATA_INTERVAL_SECONDS * 1000);
  });
};

// test creating 10000 mqtt clients that each send a message every second
(async function () {
  await testDataStream({ numberOfClients: 10000 });
})();
