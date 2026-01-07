import { Then, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { expect } from "@playwright/test";
let alertText:String;

When('I enter a username {string}',async(userName:string)=>{
    await pageFixture.page.getByPlaceholder('Username').fill(userName); 
})

When('I enter a password {word}',async(password:string)=>{
    await pageFixture.page.locator('input#password').fill(password);  
})

When('I click on login button',async()=>{
    await pageFixture.page.locator('button#login-button').click();
     pageFixture.page.on('dialog',async(alert)=>{
        alertText = alert.message();
        await alert.accept();
    })
});

Then('I should be present with an alert with that contains text {string}',async(status:string)=>{
    expect(alertText).toBe(status);
});