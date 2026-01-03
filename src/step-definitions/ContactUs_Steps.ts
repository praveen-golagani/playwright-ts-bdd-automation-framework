import { Then, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { test, expect } from '@playwright/test';



When('I type a first name', async () => {
    await pageFixture.page.locator("//input[@name='first_name']").fill("Praveen");
});

When('I type a last name', async () => {
    await pageFixture.page.locator("//input[@name='last_name']").fill("QA");
});

When('I enter an email address', async () => {
    await pageFixture.page.locator("//input[@name='email']").fill("test@fastmail.com");
})


When('I type a comment', async () => {
    await pageFixture.page.locator("//textarea[@name='message']").fill(" Demo purpose text - Happy New Year !!");
});

When('I click on the submit button', async () => {
    await pageFixture.page.locator("//input[@type='submit']").click();
});

Then('I should be presented with a successful contact us submission message', async () => {
    const text = await pageFixture.page.locator('div#contact_reply h1').innerText();
    expect(text).toBe('Thank You for your Message!');
});

Then('I should be presented with a unsuccessful contact us submission message', async()=>{
    const actInvalidText = await pageFixture.page.locator("body").textContent();
    expect(actInvalidText).toMatch(/Error: (all fields are required|Invalid email address6)/ );

});
