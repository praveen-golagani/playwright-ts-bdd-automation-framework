import { When, Given } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { env } from "../utils/playwright-timeouts";

//create a configuration object for easy access to env variables
const config = {
    fullScreen: env.parsed?.FULL_SCREEN === 'true',
};


When('I switch to the new browser tab', async () => {
    pageFixture.page = await pageFixture.context.waitForEvent("page"); // reinitialize the page as per new tab opened
    //retrive all open pages array
    const allPages = pageFixture.context.pages();
    //most recent
    pageFixture.page = allPages[allPages.length - 1];
    //move to newly opened tab
    await pageFixture.page.bringToFront();
});

Given('I wait for {int} seconds', async (seconds: number) => {
    await pageFixture.page.waitForTimeout(seconds * 1000);
});