import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';
// https://playwright.dev/docs/test-configuration
require('dotenv').config();

export default defineConfig<TestOptions>({
  use: {
    baseURL:
      process.env.DEV === '1'
        ? 'http://localhost:3000/'
        : 'https://conduit.bondaracademy.com/',
    phinionUrl: 'https://conduit.bondaracademy.com/',
  },

  projects: [
    {
      name: 'setup',
      testMatch: 'auth.setup.ts',
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' },
      dependencies: ['setup'],
    },
  ],
});
// run this configuration with the following command:
// npx playwright test --config=playwright-prod.config.ts
