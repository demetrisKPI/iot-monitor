require('dotenv').config({ silent: true });

const broker = require('./mqtt.js');

broker.start();

module.exports = broker;
