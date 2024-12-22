const REDIS_CONFIG = {
  host: process.env.REDIS_HOST_URL,
  port: process.env.REDIS_HOST_PORT,
  slotsRefreshTimeout: 5000,
};

const SENSOR_DATA_INTERVAL_SECONDS = 1;

module.exports = { REDIS_CONFIG, SENSOR_DATA_INTERVAL_SECONDS };
