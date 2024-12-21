const generateSensorData = ({ intervalTime, deviceName }) => {
  const timestamp = new Date();

  const power = 115 + Math.random() * 5;
  const energyConsumedWh = power * (intervalTime / 60);

  return {
    timestamp: timestamp.toISOString(),
    device: deviceName,
    voltage_bus: 230 + Math.random() * 0.5,
    current: (power / 230).toFixed(2),
    power: power.toFixed(2),
    load_voltage: 230 + Math.random() * 0.5,
    shunt_voltage: (Math.random() * 0.1).toFixed(2),
    calibration: 1,
    energy_consumed_wh: energyConsumedWh.toFixed(4),
  };
};

module.exports = {
  generateSensorData,
};
