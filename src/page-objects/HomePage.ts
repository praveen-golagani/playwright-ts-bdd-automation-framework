import { BasePage } from "./base/BasePage";

export class HomePage extends BasePage {

    // homepage specific methods
    public async clickOnContactUsButton(): Promise<void> {
        await this.waitAndClickByRole("link", "Contact Us Form");
    }

    public async clickOnLoginPortalButton(): Promise<void> {
        await this.waitAndClickByRole("link", "Login Portal");
    }

}