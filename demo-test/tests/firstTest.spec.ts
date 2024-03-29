import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/"); // commented lines will be first executed here
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test.skip("Locator syntax rules", async ({ page }) => {
  //by Tag name
  page.locator("input");

  //by ID
  await page.locator("#inputEmail1").click();

  //by CLASS
  page.locator(".shape-rectangle");

  //by attribute
  page.locator('[placeholder="Email"]');

  //by Class full value
  page.locator(
    'class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
  );

  //combine different selectors
  page.locator('input[placeholder="Email"][nbinput]'); // not add space between element and attribute

  //by XPath (NOT RECOMMENDED)
  page.locator('//*[@id="inputEmail1"]');

  //by partial text match
  page.locator(':text("Using")');

  //by exact text match
  page.locator(':text=is("Using the Grid")');
});

test.skip("user facing locator", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email" }).first().click();
  await page.getByRole("button", { name: "Sign in" }).first().click();

  await page.getByLabel("Email").first().click();

  await page.getByPlaceholder("Jane Doe").click();

  await page.getByTitle("IoT Dashboard").click();

  await page.getByTestId("SignIn").click();
});

test("locating child elements", async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click();
  await page
    .locator("nb-card")
    .locator("nb-radio")
    .locator(':text-is("Option 2")')
    .click();

  await page
    .locator("nb-card")
    .getByRole("button", { name: "Sign in" })
    .first()
    .click();
  await page.locator("nb-card").nth(3).getByRole("button").click();
});

test("locating parent elements with child", async ({ page }) => {
  await page
    .locator("nb-card", { hasText: "Basic form" })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator("nb-card", { has: page.locator("#inputEmail1") })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator("nb-card")
    .filter({ hasText: "Form without labels" })
    .getByPlaceholder("Subject")
    .click();

  await page
    .locator("nb-card")
    .filter({ has: page.locator(".status-danger") })
    .getByRole("textbox", { name: "Password" })
    .click();

  await page
    .locator("nb-card")
    .filter({ has: page.locator("nb-checkbox") })
    .filter({ hasText: "Sign in" })
    .getByRole("textbox", { name: "Email" })
    .click();
});

test("Reusing locators", async ({ page }) => {
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
  const emailField = basicForm.getByRole("textbox", { name: "Email" });

  await emailField.fill("ademirci@ademircix.com");
  await basicForm.getByRole("textbox", { name: "Password" }).fill("Pa12345");
  await basicForm.locator("nb-checkbox").click();
  await basicForm.getByRole("button").click();

  await expect(emailField).toHaveValue("ademirci@ademircix.com");
});

test("extracting values", async ({ page }) => {
  //single test value
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
  const buttonText = await basicForm.getByRole("button").textContent();
  expect(buttonText).toEqual("Submit");

  //all text values
  const allRadioButtonsLabels = await page
    .locator("nb-radio")
    .allTextContents();
  expect(allRadioButtonsLabels).toContain("Option 1");

  //all text values
  expect(allRadioButtonsLabels).toEqual([
    "Option 1",
    "Option 2",
    "Disabled Option",
  ]);
  
  // input value
  const emailField= basicForm.getByRole('textbox',{name:"Email"})
  await emailField.fill("mymail")

  const emailValue=await emailField.inputValue()
  expect(emailValue).toEqual("mymail")

  // get attiribute value
  const placeholderValue=await  emailField.getAttribute('placeholder')
  expect(placeholderValue).toEqual('Email')
});

test('assortions', async({page})=>{
    const basicFormButton = page.locator("nb-card").filter({ hasText: "Basic form" }).locator('button')
    //General Assortions
    const amount = 3
    expect(amount).toBe(3)

    const text=await basicFormButton.textContent()
    expect(text).toEqual("Submit")

    //Locator assertion
    await expect(basicFormButton).toHaveText("Submit")

    //Soft assertion
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click() //after add soft if it fails it will continue this line

})
