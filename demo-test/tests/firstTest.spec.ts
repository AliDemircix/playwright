import { test } from "@playwright/test";

test.beforeEach(async({page})=>{
    await page.goto("http://localhost:4200/"); // commented lines will be first executed here 
    await page.getByText('Forms').click()
})
test("the first test", async ({ page }) => {
//   await page.goto("http://localhost:4200/"); 
//   await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
});

test("navigate datepicker page", async ({ page }) => {
    // await page.goto("http://localhost:4200/");
    // await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
  });


//Grouped tests
// test.describe('test suite1',()=>{
//     test('the first test',()=>{

//     })
//     test('the  test2',()=>{

//     })
// })
