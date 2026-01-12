import { Given, Then, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { expect } from "@playwright/test";
import { CucumberWorld } from "./world/CucumberWorld";
let alertText: string;

Given('I navigate to the webdriveruniversity login page',async function(this:CucumberWorld){
        await this.loginPage.navigateToLoginPage();
});

When('I enter a username {string}', async function(this:CucumberWorld,userName: string){
    await this.loginPage.fillUserName(userName);
})

When('I enter a password {string}', async function(this:CucumberWorld,password: string){
    await this.loginPage.fillPassword(password);
})

When('I click on the login button',async function(this:CucumberWorld){
    
    //Event listeners must be registered BEFORE the event occurs
     this.loginPage.page.on('dialog',async(alert)=>{
        alertText = alert.message();
        await pageFixture.page.waitForTimeout(2000);
        await alert.accept();
    })
    await this.loginPage.clickOnLoginButton();
});

Then('I should be present with an alert with that contains text {string}', async function(this:CucumberWorld,status: string) {
    expect(alertText).toBe(status);
});