import { expect, request } from '@playwright/test';
import tags from '../test-data/tags.json';
import { test } from '../test-options';

test.describe('Working with API', () => {
  test.describe.configure({ retries: 2 });
  test.beforeEach(async ({ page, phinionUrl }) => {
    await page.route('*/**/api/tags', async (route) => {
      await route.fulfill({
        body: JSON.stringify(tags),
      });
    });

    await page.goto(phinionUrl);
    await page.waitForTimeout(500);
  });

  test('has title', async ({ page }, testInfo) => {
    if (testInfo.retry) {
      //do something like clear database etc.
    }

    await page.route('**/api/articles*', async (route) => {
      const response = await route.fetch();
      const responseBody = await response.json();
      responseBody.articles[0].title = 'Phinion Projects';
      responseBody.articles[0].description = 'Phinion Projects Description';

      await route.fulfill({
        body: JSON.stringify(responseBody),
      });
    });

    await page.getByText('Global Feed').click();
    await expect(page.locator('.navbar-brand')).toHaveText('conduit');
    await expect(page.locator('app-article-list h1').first()).toHaveText(
      'Phinion Projects',
    );
    await expect(page.locator('app-article-list p').first()).toHaveText(
      'Phinion Projects Description',
    );
  });

  test('delete article', async ({ page, request }) => {
    const response = await request.post(`${process.env.URL}`, {
      data: {
        user: { email: process.env.USERNAME, password: process.env.PASSWORD },
      },
    });
    const responseBody = await response.json();
    const accessToken = responseBody.user.token;
    console.log(accessToken);
    const articleResponse = await request.post(
      'https://conduit-api.bondaracademy.com/api/articles/',
      {
        data: {
          article: {
            tagList: ['test'],
            title: 'Test Article',
            description: 'Test Article Description',
            body: 'Test Article Body',
          },
        },
        headers: {
          Authorization: `Token ${accessToken}`,
        },
      },
    );
    expect(articleResponse.status()).toEqual(201);
    await page.screenshot({ path: 'screenshots/delete-article.png' }); // take screenshot of specific step
    await page
      .locator('.navbar-brand')
      .screenshot({ path: 'screenshots/navbar-brand.png' }); // take screenshot of specific element
    const buffer = await page.screenshot();
    console.log(buffer.toString('base64'));
    await page.getByText('Global Feed').click();
    await page.waitForTimeout(3000);
    await page.getByText('Test Article').first().click();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Delete Article' }).first().click();

    await expect(page.locator('app-article-list h1').first()).not.toContainText(
      'Test Article',
    );
  });

  test('create article', async ({ page, request }) => {
    await page.getByText('New Article').click();
    await page
      .getByRole('textbox', { name: 'Article Title' })
      .fill('Ali Test Article');
    await page
      .getByRole('textbox', { name: "What's this article about?" })
      .fill('Test Article Description');
    await page
      .getByRole('textbox', { name: 'Write your article (in markdown)' })
      .fill('Test Article Body');
    await page.getByText('Publish Article').click();
    const articleResponse = await page.waitForResponse(
      'https://conduit-api.bondaracademy.com/api/articles/',
    );
    const articleResponseBody = await articleResponse.json();
    const slugId = articleResponseBody.article.slug;

    await expect(page.locator('.article-page h1').first()).toHaveText(
      'Ali Test Article',
    );

    await page.getByText('Home').click();
    await page.waitForTimeout(2000);
    await page.getByText('Global Feed').click();
    await page.waitForTimeout(2000);
    await expect(page.locator('app-article-list h1').first()).toHaveText(
      'Ali Test Article',
    );

    const response = await request.post(
      'https://conduit-api.bondaracademy.com/api/users/login',
      {
        data: {
          user: { email: process.env.USERNAME, password: process.env.PASSWORD },
        },
      },
    );
    const responseBody = await response.json();
    const accessToken = responseBody.user.token;
    const deleteArticleResponse = await request.delete(
      `https://conduit-api.bondaracademy.com/api/articles/${slugId}`,
      {
        headers: {
          Authorization: `Token ${accessToken}`,
        },
      },
    );
    expect(deleteArticleResponse.status()).toEqual(204);
  });
});
