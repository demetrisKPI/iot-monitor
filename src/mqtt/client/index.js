const asyncMqtt = require('async-mqtt');
const nanoid = require('nanoid');

const { BROKER_URL, MQTT_USER, MQTT_PASSWORD, MQTT_QOS, NODE_APP_INSTANCE } =
  process.env;

const client = asyncMqtt.connect(BROKER_URL, {
  username: MQTT_USER,
  password: MQTT_PASSWORD,
  clean: true,
  connectTimeout: 5000,
  clientId: `${nanoid()}__${NODE_APP_INSTANCE}`,
});

const publish = async ({ message, topic, qos }) => {
  const publisherId = topic.split('/')[0];

  try {
    await client.publish(topic, message, {
      qos: qos || MQTT_QOS,
    });

    logger.info(`Successfully published message ${message} to topic ${topic}`);

    return {
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

module.exports = {
  publish,
};
