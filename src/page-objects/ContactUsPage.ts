import { BasePage } from "./base/BasePage";


export class ContactUsPage extends BasePage {

    public async fillFirstName(firstName: string): Promise<void> {
        await this.page.locator("//input[@name='first_name']").fill(firstName);
    }

    public async fillLastName(lastName: string): Promise<void> {
        await this.page.locator("//input[@name='last_name']").fill(lastName);
    }

    public async fillEmailAddress(emailAddress: string): Promise<void> {
        await this.page.locator("//input[@name='email']").fill(emailAddress);
    };

    public async fillComment(commentText: string): Promise<void> {
        await this.page.locator("//textarea[@name='message']").fill(`Demo purpose text - ${commentText}`);
    };

    public async clickOnSubmitButton(): Promise<void> {
        await this.page.locator("//input[@type='submit']").click();
    };

    public async getSuccessfulMessage(): Promise<string> {
        return await this.page.locator('div#contact_reply h1').innerText();
    };

    public async geterrorMessage(): Promise<string> {
        return await this.page.locator("body").innerText() ?? ''; //return empty if null
    };

    public async getHeaderText(message: string): Promise<string> {
        await this.page.waitForSelector("//h1 | //body", { state: 'visible' });
        const allElements = await this.page.locator("//h1 | //body").elementHandles();
        let myElementText = '';
        for (let element of allElements) {
            let text = await element.innerText();
            if (text.includes(message)) {
                myElementText = text;
                break;
            }
        }
        return myElementText;
    };

}