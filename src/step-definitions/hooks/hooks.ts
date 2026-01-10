import { AfterAll, BeforeAll, Before, After, Status } from "@cucumber/cucumber";
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
After(async function({ pickle, result }){
    if (result?.status === Status.FAILED) {
        if (pageFixture.page) {
            const screeshotPath = `./reports/screenshots/${pickle.name}-${Date.now()}.png`;
            const image = await pageFixture.page.screenshot({
                path: screeshotPath,
                type: 'png',
                // timeout:30000
            });
            await this.attach(image, 'image/png');
        } else {
            console.error('pageFixture.page is undefined');
        }
    };
    await pageFixture.page.close();
    await browser.close();
})