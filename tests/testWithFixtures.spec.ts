import { expect } from '@playwright/test';
import { test } from '../test-options';

test('test with fixtures', async ({ page, formLayoutsPage }) => {
  await expect(page.locator('app-article-list h1').first()).toHaveText(
    'Discover Bondar Academy: Your Gateway to Efficient Learning',
  );
});
