import { Given, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import logger from '../../logger/logger';
import { CucumberWorld } from "./world/CucumberWorld";

const url = "https://webdriveruniversity.com";

Given('I navigate to webdriveruniversity homepage', async function (this: CucumberWorld) {
    try {
        //access url
        await pageFixture.page.goto(url);
        logger.info(`Accessing URL : ${url}`);
        this.setUrl(url);
        // throw new Error('error simulation');
    } catch (error: any) {
        logger.error(`An error has occured : ${error.message}`);
    }
});


When('I click on the contact us button', async () => {
    //await page.pause();
    const contactUs_Button = pageFixture.page.locator("//h1[text()='CONTACT US']");
    await contactUs_Button.click();

});

When('I click on login portal button', async () => {
    const loginPortal_Button = pageFixture.page.locator('a#login-portal h1');
    await loginPortal_Button.click();
});


