import { Then, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CucumberWorld } from "./world/CucumberWorld";
import logger from "../../logger/logger";



When('I type a first name', async function (this: CucumberWorld) {
    logger.info(`Base url stored in cucumber world : ${this.getUrl()}`)
    await this.contactUsPage.fillFirstName("Praveen");
});

When('I type a last name', async function (this: CucumberWorld) {
    await this.contactUsPage.fillLastName("QA");
});

When('I enter an email address', async function (this: CucumberWorld) {
    await this.contactUsPage.fillEmailAddress("test@fastmail.com");
});


When('I type a comment', async function (this: CucumberWorld) {
    await this.contactUsPage.fillComment("Demo purpose text - Happy New Year !!");
});

When('I click on the submit button', async function (this: CucumberWorld) {
    await this.contactUsPage.clickOnSubmitButton();
});

Then('I should be presented with a successful contact us submission message', async function (this: CucumberWorld) {
    const successMessage = await this.contactUsPage.getSuccessfulMessage();
    expect(successMessage).toBe('Thank You for your Message!');
});

Then('I should be presented with a unsuccessful contact us submission message', async function (this: CucumberWorld) {
    const errorMessage = await this.contactUsPage.geterrorMessage();
    expect(errorMessage).toMatch(/Error: (all fields are required|Invalid email address)/);

});

//expressions

When('I type a first name {string}', async function (this: CucumberWorld, firstName: string) {
    await this.contactUsPage.fillFirstName(firstName);
});

When('I type a last name  {string}', async function (this: CucumberWorld, lastName: string) {
    await this.contactUsPage.fillLastName(lastName);
});

When('I enter an email address {string}', async function (this: CucumberWorld, emailAddress: string) {
    await this.contactUsPage.fillEmailAddress(emailAddress);
});

When('I type a comment {string}', async function (this: CucumberWorld, commentText: string) {
    await this.contactUsPage.fillComment(commentText);
});

//random data - faker

When('I type a random first name', async function (this: CucumberWorld) {
    const randomFirstName = faker.person.firstName();
    this.setFirstName(randomFirstName);
    await this.contactUsPage.fillFirstName(randomFirstName);
});

When('I type a random last name', async function (this: CucumberWorld) {
    const randomLastName = faker.person.lastName();
    this.setLastName(randomLastName);
    await this.contactUsPage.fillLastName(randomLastName);

});

When('I enter a random email address', async function (this: CucumberWorld) {
    const randomEMail = faker.internet.email();
    this.setEmailAddress(randomEMail);
    await this.contactUsPage.fillEmailAddress(randomEMail);
});

When('I type a random comment', async function (this: CucumberWorld) {
    this.contactUsPage.fillComment(`Please Contact help Desk - Thank you !!
         \n  ${this.getFirstName()} ${this.getLastName()} \n ${this.getEmailAddress()}`);
    //await pageFixture.page.pause();
});

//scenario outlines

When('I type a first name {string} and a last Name {string}', async function (this: CucumberWorld, firstName: string, lastName: string) {
    await this.contactUsPage.fillFirstName(firstName)
    await this.contactUsPage.fillLastName(lastName);

});

When('I enter a email address {string} and a comment {string}', async function (this: CucumberWorld, emailAddress: string, comment: string) {
    await this.contactUsPage.fillEmailAddress(emailAddress);
    await this.contactUsPage.fillComment(comment);
    //await pageFixture.page.pause();
});

Then('I should be presented with a header text {string}', async function (this: CucumberWorld, message: string) {
    const headerText = await this.contactUsPage.getHeaderText(message);
    expect(headerText).toContain(message);
});