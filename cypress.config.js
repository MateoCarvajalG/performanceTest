const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
module.exports = {
  e2e: {
    chromeWebSecurity: false,
    baseUrl: "https://www.rapicredit.com/", // this is your app
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on("task", {
        lighthouse: lighthouse((lighthouseReport)=>{
          console.log(lighthouseReport,'ligthouseReport')
        }),
      });
    },
  },
};