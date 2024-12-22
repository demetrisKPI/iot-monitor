const AWS = require('aws-sdk');
const cloudwatchLogs = new AWS.CloudWatchLogs();

const logGroupName = 'device-logs';
const logStreamName = 'device-log-stream';

const initLogStream = async () => {
  const group = await cloudwatchLogs.createLogGroup({ logGroupName }).promise();
  const stream = await cloudwatchLogs
    .createLogStream({ logGroupName, logStreamName })
    .promise();

  return { group, stream };
};

const streamDeviceLog = async (log) => {
  const logData = {
    logGroupName,
    logStreamName,
    logEvents: [
      {
        message: JSON.stringify(log),
        timestamp: Date.now(),
      },
    ],
  };

  const res = await cloudwatchLogs.putLogEvents(logData).promise();

  return res;
};

module.exports = {
  initLogStream,
  streamDeviceLog,
};
