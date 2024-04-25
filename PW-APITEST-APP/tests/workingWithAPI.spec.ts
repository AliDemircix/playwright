import { test, expect } from "@playwright/test";
import tags from "../test-data/tags.json";

test.beforeEach(async ({ page }) => {
  await page.route("*/**/api/tags", async (route) => {
    await route.fulfill({
      body: JSON.stringify(tags),
    });
  });
  await page.route("**/api/articles*", async (route) => {
    const response = await route.fetch();
    const responseBody = await response.json();
    responseBody.articles[0].title = "Phinion Projects";
    responseBody.articles[0].description = "Phinion Projects Description";
    await route.fulfill({
      body: JSON.stringify(responseBody),
    });
  });
  await page.goto("https://conduit.bondaracademy.com/");
  await page.waitForTimeout(500);
});

test("has title", async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page.locator(".navbar-brand")).toHaveText("conduit");
  await expect(page.locator("app-article-list h1").first()).toHaveText("Phinion Projects");
  await expect(page.locator("app-article-list p").first()).toHaveText("Phinion Projects Description");
});
