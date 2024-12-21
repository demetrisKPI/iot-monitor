require('dotenv').config({ silent: true });

const { SENSOR_DATA_INTERVAL_SECONDS } = require('../util/constants.js');
const { generateClients } = require('../load-simul/generateClients.js');
const { publishEnergyLog } = require('../load-simul/publishEnergyLog.js');

let clients;

const testDataStream = async ({ numberOfClients }) => {
  clients = await generateClients(numberOfClients);

  clients.forEach(({ client, name }) => {
    setInterval(() => {
      publishEnergyLog({ client, name });
    }, SENSOR_DATA_INTERVAL_SECONDS * 1000);
  });
};

(async function () {
  await testDataStream({ numberOfClients: 10000 });
})();
