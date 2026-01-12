import { Given, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import logger from '../../logger/logger';
import { CucumberWorld } from "./world/CucumberWorld";

const url = "https://webdriveruniversity.com";

Given('I navigate to webdriveruniversity homepage', async function (this: CucumberWorld) {
    try {
        //access url
       await this.homePage.navigate(url);
        logger.info(`Accessing URL : ${url}`);
        this.setUrl(url);
        // throw new Error('error simulation');
    } catch (error: any) {
        logger.error(`An error has occured : ${error.message}`);
    }
});


When('I click on the contact us button', async function(this:CucumberWorld) {
    this.homePage.clickOnContactUsButton();

});

When('I click on login portal button', async function(this:CucumberWorld) {
   this.homePage.clickOnLoginPortalButton();
});


