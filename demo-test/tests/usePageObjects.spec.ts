import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("navigate to form page", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutsPage();
  await pm.navigateTo().datePickerPage();
  await pm.navigateTo().smartTablePage();
});

test("parametrized methods", async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().formLayoutsPage();
  await pm
    .onFormLayoutsPage()
    .submitGridFormCredentialsAndSelectOption("ali", "testpass", "Option 1");
  await pm
    .onFormLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckBox("ali", "ali@gmail.com", true);
  await pm.navigateTo().datePickerPage();
  await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(5);
  await pm.onDatepickerPage().selectRangeDatePickerDateFromToday(5, 10);
});
