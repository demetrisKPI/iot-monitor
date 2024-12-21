module.exports = {
  testEnvironment: 'node',
  verbose: true,
  bail: false,
  maxConcurrency: 12,
  testTimeout: 30000,
  setupFilesAfterEnv: ['./jestSetupTests.js'],
  transformIgnorePatterns: ['/node_modules/(?!).+\\.js$'],
};
