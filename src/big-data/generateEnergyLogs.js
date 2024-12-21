const fs = require('fs');

const {
  generateSensorData,
} = require('../device/sensor/generateSensorData.js');

const generateEnergyLogs = ({ totalTime, intervalTime, deviceName }) => {
  const logs = [];

  for (let i = 0; i < totalTime / intervalTime; i++) {
    const data = generateSensorData({
      intervalTime,
      deviceName,
    });

    logs.push(data);
  }

  fs.writeFileSync(
    `./logs/energy_logs_${deviceName}.json`,
    JSON.stringify(logs, null, 2),
  );
};

module.exports = {
  generateEnergyLogs,
};
