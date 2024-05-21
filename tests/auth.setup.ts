import { test as setup } from "@playwright/test";

const authFile = ".auth/user.json";

setup("auth", async ({ page }) => {
  await page.goto("https://conduit.bondaracademy.com/");
  await page.waitForTimeout(500);
  await page.getByText("Sign in").click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("alidemircix@gmail.com");
  await page.getByRole("textbox", { name: "Password" }).fill("Test2024");
  await page.getByRole("button").click();
  await page.waitForResponse("https://conduit-api.bondaracademy.com/api/tags");
  console.log("Logged in");
  await page.context().storageState({ path: authFile });
});
