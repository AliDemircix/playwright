import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test.describe("Form layouts page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("input fields", async ({ page }) => {
    const usingTheGridEmailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });
    await usingTheGridEmailInput.fill("test@test.com");
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially("rest@test.com", {
      delay: 500,
    });

    //generic assortion
    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual("rest@test.com");

    //locator assortion
    await expect(usingTheGridEmailInput).toHaveValue("rest@test.com");
  });

  test("testing radio button", async ({ page }) => {
    const usingTheGridFrom = page.locator("nb-card", {
      hasText: "Using the Grid",
    });

    await usingTheGridFrom.getByLabel("Option 1").check({ force: true }); // force true for hidden visibility
    // await usingTheGridFrom.getByRole("radio",{name: "Option 1"}).check({force:true})

    const radiaStatus = await usingTheGridFrom
      .getByRole("radio", { name: "Option 1" })
      .isChecked();
    expect(radiaStatus).toBeTruthy();
    await expect(
      usingTheGridFrom.getByRole("radio", { name: "Option 1" })
    ).toBeChecked();

    await usingTheGridFrom
      .getByRole("radio", { name: "Option 2" })
      .check({ force: true });
    expect(
      await usingTheGridFrom
        .getByRole("radio", { name: "Option 1" })
        .isChecked()
    ).toBeFalsy();
  });
});

test("checkbox", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Toastr").click();

  await page
    .getByRole("checkbox", { name: "Hide on click" })
    .uncheck({ force: true });

  await page
    .getByRole("checkbox", { name: "Prevent arising of duplicate toast" })
    .check({ force: true });

  await expect(
    page.getByRole("checkbox", { name: "Hide on click" }).isChecked
  ).toBeTruthy();

  await expect(
    await page
      .getByRole("checkbox", { name: "Prevent arising of duplicate toast" })
      .check({ force: true })
  ).toBeFalsy;
  const allcheckboxes = page.getByRole("checkbox");
  for (const box of await allcheckboxes.all()) {
    await box.check({ force: true });
    expect(await box.isChecked()).toBeTruthy();
  }
});

test("lists and dropdowns", async ({ page }) => {
  const dropDownMenu = page.locator("ngx-header nb-select");
  await dropDownMenu.click();

  page.getByRole("list"); // to select ul
  page.getByRole("listitem"); // to select li

  // const optionList= page.getByRole('link').locator("nb-option")
  const optionList = page.locator("nb-option-list nb-option");
  await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);
  await optionList.filter({ hasText: "Cosmic" }).click();
  const header = page.locator("nb-layout-header");
  await expect(header).toHaveCSS("background-color", "rgb(50, 50, 89)");
});

test("test all dropdowns background color", async ({ page }) => {
  const dropDownMenu = page.locator("ngx-header nb-select");
  await dropDownMenu.click();

  const optionList = page.locator("nb-option-list nb-option");
  const header = page.locator("nb-layout-header");
  const colors = {
    Light: "rgb(255, 255, 255)",
    Dark: "rgb(34, 43, 69)",
    Cosmic: "rgb(50, 50, 89)",
    Corporate: "rgb(255, 255, 255)",
  };

  for (const color in colors) {
    await optionList.filter({ hasText: color }).click();
    await expect(header).toHaveCSS("background-color", colors[color]);
    if (color !== "Corporate") await dropDownMenu.click();
  }
});

test("tooltips", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Tooltip").click();

  const toolTipCard = page.locator("nb-card", {
    hasText: "Tooltip Placements",
  });
  await toolTipCard.getByRole("button", { name: "Top" }).hover();

  page.getByRole("tooltip");
  const tooltip = await page.locator("nb-tooltip").textContent();
  expect(tooltip).toEqual("This is a tooltip");
});

test("dialog box alert", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  page.on("dialog", (dialog) => {
    expect(dialog.message()).toEqual("Are you sure you want to delete?");
    dialog.accept(); // use this to accept opened dialog
  });
  await page
    .getByRole("table")
    .locator("tr", { hasText: "mdo@gmail.com" })
    .locator(".nb-trash")
    .click();
  //Check if it is deleted
  await expect(page.locator("table tr").first()).not.toHaveText(
    "mdo@gmail.com"
  );
});

test("working with tables", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  // // 1. get the row
  // const targetRow = page.getByRole("row", { name: "twitter@outlook.com" });
  // await targetRow.locator(".nb-edit").click();
  // await page.locator("input-editor").getByPlaceholder("Age").clear();
  // await page.locator("input-editor").getByPlaceholder("Age").fill("35");
  // await page.locator(".nb-checkmark").click();

  // const updatedAge = await page
  //   .getByRole("table")
  //   .locator("tr", { hasText: "twitter@outlook.com" })
  //   .locator(".ng-star-inserted")
  //   .getByText("35");
  // await expect(updatedAge).toHaveText("35");

  // //2. get row based on the value in the specific column
  // await page.locator(".ng2-smart-pagination-nav").getByText("2").click();
  // //Filter with specific column with td nth
  // const targetRowById = page
  //   .getByRole("row", { name: "11" })
  //   .filter({ has: page.locator("td").nth(1).getByText("11") });
  // await targetRowById.locator(".nb-edit").click();
  // await page.locator("input-editor").getByPlaceholder("E-mail").clear();
  // await page
  //   .locator("input-editor")
  //   .getByPlaceholder("E-mail")
  //   .fill("ademircix@gmail.com");
  // await page.locator(".nb-checkmark").click();
  // await expect(targetRowById.locator("td").nth(5)).toHaveText(
  //   "ademircix@gmail.com"
  // );

  //3 test filter of the table
  const ages = ["20", "30", "40", "200"];
  for (let age of ages) {
    await page.locator("input-filter").getByPlaceholder("Age").clear();
    await page.locator("input-filter").getByPlaceholder("Age").fill(age);
    await page.waitForTimeout(500)
    const ageRows = page.locator("tbody tr");
    for (let row of await ageRows.all()) {
      const cellValue = await row.locator("td").last().textContent();
      if (age !== "200") {
       await expect(cellValue).toEqual(age);
      }
      else{
        await expect(cellValue).toEqual(" No data found ");
      }
    }
  }
});

test("date pickers",async({page})=>{
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();

  const calendarInputField = page.getByPlaceholder("Form Picker")
  await calendarInputField.click()
  await page.locator('[class="day-cell ng-star-inserted"]').getByText('1',{exact:true}).click()
  await expect(calendarInputField).toHaveValue("Feb 1, 2024")
})
