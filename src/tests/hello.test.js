require('dotenv').config({ silent: true });

const logger = require('../util/logger.js');

describe('initial', () => {
  test('hello', () => {
    logger.info('yo');
    console.log('hello');
  });
});
