const aedes = require('./src/mqtt/broker/index.js');

jest.useFakeTimers();

let mqttBroker, mqttServer;

beforeAll(() => {
  const { broker, server } = aedes.start();
  mqttBroker = broker;
  mqttServer = server;
});

afterAll(() => {
  mqttBroker.close();
  mqttServer.close();
});

expect.extend({
  toBeAnything() {
    return {
      message: 'Expected anything',
      pass: true,
    };
  },
});
