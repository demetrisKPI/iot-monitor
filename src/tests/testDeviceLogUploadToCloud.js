require('dotenv').config({ silent: true });
const { subToTopic } = require('../lib/mqtt.js');

//start broker
require('../broker/index.js');

//start device manager
const deviceManager = require('../server/index.js');

// subscribe device manager to topic 'test_device/log'
const deviceId = 'test_device';
subToTopic({ client: deviceManager, topicName: `${deviceId}/log` });
