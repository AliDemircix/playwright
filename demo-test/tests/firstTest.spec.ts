import { test } from "@playwright/test";

test.beforeEach(async({page})=>{
    await page.goto("http://localhost:4200/"); // commented lines will be first executed here 
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator syntax rules',async({page})=>{

    //by Tag name
    page.locator('input')

    //by ID
    await page.locator('#inputEmail1').click()

    //by CLASS
    page.locator('.shape-rectangle')

    //by attribute
    page.locator('[placeholder="Email"]')

    //by Class full value
    page.locator('class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selectors
    page.locator('input[placeholder="Email"][nbinput]') // not add space between element and attribute

    //by XPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')

    //by partial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text=is("Using the Grid")')
})

