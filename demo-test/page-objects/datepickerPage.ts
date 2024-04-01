import { Page, expect } from "@playwright/test";

export class DatepickerPage {
  private readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
    const calendarInputField = this.page.getByPlaceholder("Form Picker");
    await calendarInputField.click();
    const dateToAssert = await this.selectDateInTheCalendar(
      numberOfDaysFromToday
    );

    await expect(calendarInputField).toHaveValue(dateToAssert);
  }
  async selectRangeDatePickerDateFromToday(startDateFromToday:number,endDayFromToday:number){
    const calendarInputField = this.page.getByPlaceholder("Range Picker");
    await calendarInputField.click();
    const startDate = await this.selectDateInTheCalendar(startDateFromToday);
    const endDate = await this.selectDateInTheCalendar(endDayFromToday);
    await expect(calendarInputField).toHaveValue(`${startDate} - ${endDate}`);
  }

  private async selectDateInTheCalendar(numberOfDaysFromToday: number) {
    let date = new Date();
    date.setDate(date.getDate() + numberOfDaysFromToday);
    const expectedDate = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString("En-Us", { month: "short" });
    const expectedMonthLong = date.toLocaleString("En-Us", { month: "long" });
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

    let calendarMonthAndYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;
    while (!calendarMonthAndYear?.includes(expectedMonthAndYear)) {
      await this.page
        .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
        .click();
      calendarMonthAndYear = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    }
    await this.page
      .locator('.day-cell.ng-star-inserted')
      .getByText(expectedDate, { exact: true })
      .click();
    return dateToAssert;
  }
}
