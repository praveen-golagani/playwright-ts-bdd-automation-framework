import { Page, Locator } from "@playwright/test";
import { pageFixture } from "../../step-definitions/hooks/browserContextFixture";

export class BasePage {

    get page(): Page {
        return pageFixture.page;
    }

    //Promise<void> in TS when you're defining an async func that doesn't explicitly return a value
    public async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    public async waitAndClick(locator:Locator):Promise<void>{
        await locator.isVisible();
        await locator.click();
    }

    public async waitAndClickByRole(role: string, name: string): Promise<void> {
        const element = this.page.getByRole(role as any, { name: name });
        await element.click();
    }

    public async waitAndClickSelector(selector:string):Promise<void>{
        await this.page.waitForSelector(selector);
        await this.page.click(selector);
    }

    public async switchToNewTab(): Promise<void>{

            await this.page.context().waitForEvent("page"); // reinitialize the page as per new tab opened
            //retrive all open pages array
            const allPages = this.page.context().pages();
            //most recent
            pageFixture.page = allPages[allPages.length - 1];
            //move to newly opened tab
            await this.page.bringToFront();
    }
}