require('dotenv').config({ silent: true });
const { generateEnergyLogs } = require('../device/sensor/generateData.js');

describe('Generate mock data', () => {
  test('Generate mock sensor data for energy consumptionin 1 hour', () => {
    expect.assertions(1);

    const deviceName = 'test_device';
    const logFileName = `energy_logs_${deviceName}.json`;

    generateEnergyLogs({
      totalTime: 60,
      intervalTime: 1,
      deviceName,
    });

    const logs = require(`../../logs/${logFileName}`);

    expect(logs).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          timestamp: expect.any(String),
          device: deviceName,
          voltage_bus: expect.any(Number),
          current: expect.any(String),
          power: expect.any(String),
          load_voltage: expect.any(Number),
          shunt_voltage: expect.any(String),
          calibration: expect.any(Number),
          energy_consumed_wh: expect.any(String),
        }),
      ]),
    );
  });
});
