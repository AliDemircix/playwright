import { test as setup } from '@playwright/test';
import user from '../.auth/user.json';

const authFile = '.auth/user.json';

// setup("auth", async ({ page }) => {
//   await page.goto("https://conduit.bondaracademy.com/");
//   await page.waitForTimeout(500);
//   await page.getByText("Sign in").click();
//   await page
//     .getByRole("textbox", { name: "Email" })
//     .fill("alidemircix@gmail.com");
//   await page.getByRole("textbox", { name: "Password" }).fill("Test2024");
//   await page.getByRole("button").click();
//   await page.waitForResponse("https://conduit-api.bondaracademy.com/api/tags");
//   console.log("Logged in");
//   await page.context().storageState({ path: authFile });
// });
setup('auth', async ({ request }) => {
  const response = await request.post(
    'https://conduit-api.bondaracademy.com/api/users/login',
    {
      data: {
        user: {
          email: process.env.USERNAME,
          password: process.env.PASSWORD,
        },
      },
    },
  );
  const responseBody = await response.json();
  const accessToken = responseBody.user.token;
  user.origins[0].localStorage[0].value = accessToken;
  process.env['ACCESS_TOKEN'] = accessToken;
});
