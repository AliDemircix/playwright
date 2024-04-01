import { Page } from "@playwright/test";
export class formLayoutsPage {
  private readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async submitGridFormCredentialsAndSelectOption(
    email: string,
    password: string,
    optionText: string
  ) {
    const usingGridForm = this.page.locator("nb-card", {
      hasText: "Using the Grid",
    });
    await usingGridForm.getByRole("textbox", { name: "Email" }).fill(email);
    await usingGridForm
      .getByRole("textbox", { name: "Password" })
      .fill(password);
    await usingGridForm
      .getByRole("radio", { name: optionText })
      .check({ force: true });
    await usingGridForm.getByRole("button").click();
  }
  /**
   * This method will submit the inline form with name, email and checkbox
   * @param name - sould be name of the user
   * @param email - sould be email of the user
   * @param rememberMe  - sould be boolean value
   */
  async submitInlineFormWithNameEmailAndCheckBox(name:string,email:string,rememberMe:boolean){
    const inlineForm = this.page.locator("nb-card", {
        hasText: "Inline form",
      });
      await inlineForm.getByRole("textbox", { name: "Jane Doe" }).fill(name);
      await inlineForm
        .getByRole("textbox", { name: "Email" })
        .fill(email);
     if(rememberMe){
        await inlineForm.getByRole("checkbox").check({ force: true });
        await inlineForm.getByRole("button").click();
     }
  }
}
