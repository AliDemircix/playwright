import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';
// https://playwright.dev/docs/test-configuration
require('dotenv').config();

export default defineConfig<TestOptions>({
  timeout: 40000,
  globalTimeout: 60000,
  expect: {
    timeout: 2000,
  },
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000/',
    baseURL:
      process.env.DEV === '1'
        ? 'http://localhost:3000/'
        : 'https://conduit.bondaracademy.com/',
    phinionUrl: 'https://conduit.bondaracademy.com/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: {
      mode: 'retain-on-failure', // it will record video only failed steps
      size: { width: 1920, height: 1080 }, // this is for specific video size defaultly 800px
    },
  },

  projects: [
    // {
    //   name: 'dev',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     storageState: '.auth/user.json',
    //     baseURL: 'http://localhost:3001/',
    //   },
    // },
    // {
    //   name: 'staging',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     storageState: '.auth/user.json',
    //     baseURL: 'http://localhost:3002/',
    //   },
    // },
    //Create auth setup
    {
      name: 'setup',
      testMatch: 'auth.setup.ts',
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' },
      //dependencies: means before running this test, run the setup test
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: { browserName: 'firefox', storageState: '.auth/user.json' },
      dependencies: ['setup'],
    },
  ],
});
