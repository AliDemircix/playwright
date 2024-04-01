import {test,expect} from "@playwright/test"
import { NavigationPage } from "../page-objects/navigationPage"
import { formLayoutsPage } from "../page-objects/formLayoutsPage"
import { DatepickerPage } from "../page-objects/datepickerPage"
test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/')
})

test("navigate to form page", async({page})=>{
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datePickerPage()
    await navigateTo.smartTablePage()
})
test("parametrized methods",async({page})=>{
const navigateTo = new NavigationPage(page)
const onFormLayoutsPage = new formLayoutsPage(page)
const onDatepickerPage = new DatepickerPage(page)

await navigateTo.formLayoutsPage()
await onFormLayoutsPage.submitGridFormCredentialsAndSelectOption("ali", "testpass", "Option 1")  
await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckBox("ali", "ali@gmail.com",true)
await navigateTo.datePickerPage()
await onDatepickerPage.selectCommonDatePickerDateFromToday(5)
await onDatepickerPage.selectRangeDatePickerDateFromToday(5,10)
})