require('dotenv').config({ silent: true });

const logger = require('../util/logger.js');

const publish = async ({ client, message, topic, qos = 0 }) => {
  const publisherId = topic.split('/')[0];

  try {
    const response = await client.publish(topic, message, {
      qos: qos || process.env.MQTT_QOS,
    });

    logger.info(`Successfully published message ${message} to topic ${topic}`);

    return {
      response,
      publisherId,
      status: `Successfully published message ${message} to topic ${topic}`,
    };
  } catch (error) {
    logger.info(
      { error },
      `Failed to publish message ${message} to topic ${topic}`,
    );

    return Promise.reject(
      new Error(
        `Failed to publish message ${message} to topic ${topic}. Error: ${error}`,
      ),
    );
  }
};

module.exports = { publish };
