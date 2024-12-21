const fs = require('fs');

const generateEnergyLogs = ({ totalTime, intervalTime, deviceName }) => {
  const logs = [];
  let currentTime = new Date();

  for (let i = 0; i < totalTime / intervalTime; i++) {
    const timestamp = new Date(currentTime);
    timestamp.setMinutes(currentTime.getMinutes() + i * intervalTime);

    const power = 115 + Math.random() * 5;
    const energyConsumedWh = power * (intervalTime / 60);

    logs.push({
      timestamp: timestamp.toISOString(),
      device: deviceName,
      voltage_bus: 230 + Math.random() * 0.5,
      current: (power / 230).toFixed(2),
      power: power.toFixed(2),
      load_voltage: 230 + Math.random() * 0.5,
      shunt_voltage: (Math.random() * 0.1).toFixed(2),
      calibration: 1,
      energy_consumed_wh: energyConsumedWh.toFixed(4),
    });
  }

  fs.writeFileSync(
    `./logs/energy_logs_${deviceName}.json`,
    JSON.stringify(logs, null, 2),
  );
};

module.exports = {
  generateEnergyLogs,
};
