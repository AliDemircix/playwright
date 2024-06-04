import { test as base } from '@playwright/test';

export type TestOptions = {
  phinionUrl: string;
  formLayoutsPage: string;
};

export const test = base.extend<TestOptions>({
  phinionUrl: ['', { option: true }],

  formLayoutsPage: async ({ page }, use) => {
    await page.goto('https://conduit.bondaracademy.com/');
    await page.getByText('Global Feed').click();
    await use('');
    console.log('it will trigger after the test is done.');
  },
});
