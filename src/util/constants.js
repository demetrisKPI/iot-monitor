const SUBTOPICS = ['test', 'sub', 'log'];

const REDIS_CONFIG = {
  host: process.env.REDIS_HOST_URL,
  port: process.env.REDIS_HOST_PORT,
  slotsRefreshTimeout: 5000,
};

module.exports = { SUBTOPICS, REDIS_CONFIG };
