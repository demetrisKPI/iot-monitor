require('dotenv').config({ silent: true });

const broker = require('./index.js');

broker.start();
