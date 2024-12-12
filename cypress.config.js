const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
module.exports = {
  e2e: {
    baseUrl: "http://google.com", // this is your app
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on("task", {
        lighthouse: lighthouse(),
      });
    },
  },
};