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
