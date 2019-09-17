module.exports = function (config) {
  // noinspection JSFileReferences
  config.set({
    mutator: 'typescript',
    packageManager: 'npm',
    reporters: ['html', 'clear-text', 'progress'],
    testRunner: 'mocha',
    tsconfigFile: 'tsconfig.json',
    mutate: ['src/**/*.ts'],
    mochaOptions: {
      files: [
        'test/**/*.test.ts']
    },
    thresholds: {
      high: 100,
      low: 90,
      break: 80
    }
  })
}
