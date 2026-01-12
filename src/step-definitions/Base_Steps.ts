import { When, Given } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { env } from "../utils/playwright-timeouts";
import { CucumberWorld } from "./world/CucumberWorld";
//create a configuration object for easy access to env variables
const config = {
    fullScreen: env.parsed?.FULL_SCREEN === 'true',
};


When('I switch to the new browser tab', async function(this: CucumberWorld) {
    await this.basePage.switchToNewTab();
});

Given('I wait for {int} seconds', async (seconds: number) => {
    await pageFixture.page.waitForTimeout(seconds * 1000);
});