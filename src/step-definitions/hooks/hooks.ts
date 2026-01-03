import { AfterAll, BeforeAll, Before, After } from "@cucumber/cucumber";
import { Browser, chromium } from "playwright/test";
import { pageFixture } from "./browserContextFixture";

let browser: Browser;


//Runs before All scenarios
BeforeAll(async () => {
    console.log("\n Executing test suite..");
});

//Runs after All scenarios
AfterAll(async () => {
    console.log("\n Finished Executing test suite..");
});

//before each scenario
Before(async () => {
    browser = await chromium.launch({ headless: false });
    pageFixture.context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
    pageFixture.page = await pageFixture.context.newPage();
});

//Runs after each scenario
After(async () => {
    await pageFixture.page.close();
    await browser.close();
})