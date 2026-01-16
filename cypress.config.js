const { defineConfig } = require("cypress");
const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs");

module.exports = defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,
  defaultCommandTimeout: 10000,
  retries: {
    runMode: 2,
    openMode: 1
  },

  e2e: {
    setupNodeEvents(on, config) {
      const envName = process.env.ENV || "dev";
      const envPath = path.resolve(__dirname, `.env.${envName}`);

      // ✅ Load .env ONLY if it exists (local)
      if (fs.existsSync(envPath)) {
        dotenv.config({ path: envPath });
        console.log(`Loaded ${envPath}`);
      } else {
        console.log(`No .env file found for ${envName}, using process.env`);
      }

      // ✅ BrowserStack / CLI must provide BASE_URL
      if (!process.env.BASE_URL) {
        throw new Error("❌ BASE_URL is not defined (local .env or BrowserStack env)");
      }

      config.baseUrl = process.env.BASE_URL;
      config.env.environment = envName;

      return config;
    },

    // ✅ VERY IMPORTANT (TS + JS support)
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    supportFile: "cypress/support/e2e.js"
  }
});
