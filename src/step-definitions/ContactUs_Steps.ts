import { Then, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CucumberWorld } from "./world/CucumberWorld";
import logger from "../../logger/logger";



When('I type a first name', async function(this:CucumberWorld) {
    logger.info(`Base url stored in cucumber world : ${this.getUrl()}`)
    await pageFixture.page.locator("//input[@name='first_name']").fill("Praveen");
});

When('I type a last name', async () => {
    await pageFixture.page.locator("//input[@name='last_name']").fill("QA");
});

When('I enter an email address', async () => {
    await pageFixture.page.locator("//input[@name='email']").fill("test@fastmail.com");
})


When('I type a comment', async () => {
    await pageFixture.page.locator("//textarea[@name='message']").fill("Demo purpose text - Happy New Year !!");
});

When('I click on the submit button', async () => {
    await pageFixture.page.locator("//input[@type='submit']").click();
});

Then('I should be presented with a successful contact us submission message', async () => {
    const text = await pageFixture.page.locator('div#contact_reply h1').innerText();
    expect(text).toBe('Thank You for your Message!');
});

Then('I should be presented with a unsuccessful contact us submission message', async () => {
    const actInvalidText = await pageFixture.page.locator("body").textContent();
    expect(actInvalidText).toMatch(/Error: (all fields are required|Invalid email address)/);

});

//expressions

When('I type a first name {string}', async (firstName: string) => {
    await pageFixture.page.locator("//input[@name='first_name']").fill(firstName);
    console.log(`Entered first name - ${firstName}`)
});

When('I type a last name  {string}', async (lastName: string) => {
    await pageFixture.page.locator("//input[@name='last_name']").fill(lastName);
    console.log(`Entered last name - ${lastName}`)
});

When('I enter an email address {string}', async (emailAddress: string) => {
    await pageFixture.page.locator("//input[@name='email']").fill(emailAddress);
    console.log(`Entered email - ${emailAddress}`)
});

When('I type a comment as {string} use {int} rule to remember', async (comText: string, comNum: number) => {
    await pageFixture.page.locator("//textarea[@name='message']").fill(`Demo purpose text - ${comText} use ${comNum} rule to remember`);
    console.log(`${comText} use ${comNum} rule to remember`);
});

//random data - faker

When('I type a random first name', async function(this: CucumberWorld){
    const randomFirstName = faker.person.firstName();
    this.setFirstName(randomFirstName);
    await pageFixture.page.locator("//input[@name='first_name']").fill(randomFirstName);
});

When('I type a random last name', async function(this: CucumberWorld) {
    const randomLastName = faker.person.lastName();
    this.setLastName(randomLastName);
    await pageFixture.page.locator("//input[@name='last_name']").fill(randomLastName);

});

When('I enter a random email address', async function(this: CucumberWorld) {
    const randomEMail = faker.internet.email();
    this.setEmailAddress(randomEMail);
    await pageFixture.page.locator("//input[@name='email']").fill(randomEMail);
});

When('I type a random comment', async function(this:CucumberWorld) {
    await pageFixture.page.locator("//textarea[@name='message']").
    fill(`Please Contact help Desk - Thank you !! \n  ${this.getFirstName()} ${this.getLastName()} \n ${this.getEmailAddress()}`);
    //await pageFixture.page.pause();
});
//scenario outlines

When('I type a first name {string} and a last Name {string}', async (firstName: string, lastName: string) => {
    await pageFixture.page.locator("//input[@name='first_name']").fill(firstName);
    await pageFixture.page.locator("//input[@name='last_name']").fill(lastName);

});

When('I enter a email address {string} and a comment {string}', async (emailAddress: string, comment: string) => {
    await pageFixture.page.locator("//input[@name='email']").fill(emailAddress);
    await pageFixture.page.locator("//textarea[@name='message']").fill(comment);
    //await pageFixture.page.pause();
});

Then('I should be presented with a header text {string}', async (message: string) => {
    await pageFixture.page.waitForSelector("//h1 | //body",{state:'visible'});
    const allElements = await pageFixture.page.locator("//h1 | //body").elementHandles();
    let myElementText = '';
    for (let element of allElements){
        let text = await element.innerText();
        if(text.includes(message)){
            myElementText = text;
            break;
        }
    }
    expect(myElementText).toContain(message);
});