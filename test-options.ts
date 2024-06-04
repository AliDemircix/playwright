import { test as base } from '@playwright/test';

export type TestOptions = {
  phinionUrl: string;
};

export const test = base.extend<TestOptions>({
  phinionUrl: ['', { option: true }],
});
