require('dotenv').config({ silent: true });

const {
  DynamoDBClient,
  BatchWriteItemCommand,
} = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  QueryCommand,
} = require('@aws-sdk/lib-dynamodb');

const logger = require('../util/logger.js');

const { AWS_REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY } = process.env;

const dbClient = new DynamoDBClient({
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
  region: AWS_REGION,
});
const dbDocClient = DynamoDBDocumentClient.from(dbClient);

const getDeviceLogsFromDynamoDB = async ({ deviceId, topic }) => {
  try {
    const TableName = 'device-logs';

    const command = new QueryCommand({
      TableName,
      KeyConditionExpression: 'logId = :logId',
      ExpressionAttributeValues: {
        ':logId': `${deviceId}/${topic}`,
      },
    });

    const response = await dbDocClient.send(command);

    return response;
  } catch (error) {
    logger.error(error, 'get device logs from dynamodb error');
    throw error;
  }
};

const writeDeviceLogsToDynamoDB = async ({
  deviceId,
  topic,
  message,
  logTimestamp,
}) => {
  try {
    const TableName = 'device-logs';

    const batchWrite = new BatchWriteItemCommand({
      RequestItems: {
        [TableName]: [
          {
            PutRequest: {
              Item: {
                logId: { S: `${deviceId}/${topic}` },
                timestamp: { S: logTimestamp },
                deviceId: { S: deviceId },
                topic: { S: topic },
                message: { S: JSON.stringify(message) },
              },
            },
          },
        ],
      },
    });

    const response = await dbDocClient.send(batchWrite);

    return response;
  } catch (error) {
    logger.error(error, 'post device log to dynamodb error');
    throw error;
  }
};

module.exports = { getDeviceLogsFromDynamoDB, writeDeviceLogsToDynamoDB };
