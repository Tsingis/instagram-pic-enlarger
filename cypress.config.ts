import { defineConfig } from "cypress";
import * as path from "path";

export default defineConfig({
  e2e: {
    baseUrl: "https://example.com",
    specPattern: "tests/**/*.cy.ts",
    supportFile: false,
    fixturesFolder: false,
    defaultCommandTimeout: 5000,
    viewportWidth: 1280,
    viewportHeight: 720,
    chromeWebSecurity: false,
    testIsolation: true,
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
          launchOptions.extensions.push(path.resolve(__dirname, "release"));
          return launchOptions;
      });
    }
  },
});