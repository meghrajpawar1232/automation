const { defineConfig } = require("cypress");

module.exports = defineConfig({

  video: true,
  // videoUploadOnPasses: true,
  screenshotsFolder: './screenshots',
  //reporter: 'mochawesome',

  modifyObstructiveCode: false,
  trashAssetsBeforeRuns: false,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 40000,
  viewportWidth: 1500,
  viewportHeight: 1000,
  requestTimeout: 50000,
  responseTimeout: 60000,
  watchForFileChanges: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://dev.sepstream.net/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
