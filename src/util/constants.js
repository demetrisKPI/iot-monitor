const SUBTOPICS = ['test', 'sub'];

const REDIS_CONFIG = {
  host: process.env.REDIS_HOST_URL,
  port: process.env.REDIS_HOST_PORT,
  slotsRefreshTimeout: 5000,
};

module.exports = { SUBTOPICS, REDIS_CONFIG };
