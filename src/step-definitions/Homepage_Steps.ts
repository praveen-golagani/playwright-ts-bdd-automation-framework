import { Given, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";

const url = "https://webdriveruniversity.com";

Given('I navigate to webdriveruniversity homepage', async () => {
    //access url
    await pageFixture.page.goto(url);
});


When('I click on the contact us button', async () => {
    //await page.pause();
    const contactUs_Button = pageFixture.page.locator("//h1[text()='CONTACT US']");
    await contactUs_Button.click();

});

When('I click on login portal button',async()=>{
    const loginPortal_Button = pageFixture.page.locator('a#login-portal h1');
    await loginPortal_Button.click();
})

When('I switch to the new browser tab', async () => {
    pageFixture.page = await pageFixture.context.waitForEvent("page"); // reinitialize the page as per new tab opened
    //retrive all open pages array
    const allPages = pageFixture.context.pages();
    //most recent
    pageFixture.page = allPages[allPages.length - 1];
    //move to newly opened tab
    await pageFixture.page.bringToFront();
    //maximize
    await pageFixture.page.setViewportSize({ width: 1920, height: 1080 });
});


