import { BasePage } from "./base/BasePage";

export class LoginPage extends BasePage{
    

    public async navigateToLoginPage(): Promise<void> {
        await this.navigate("https://webdriveruniversity.com/Login-Portal/index.html");
    }

    public async fillUserName(userName: string): Promise<void>{
        await this.page.getByPlaceholder('Username').fill(userName);
    }
    
    public async fillPassword (password: string): Promise<void>{
        await this.page.locator('input#password').fill(password);
    }
    
    public async clickOnLoginButton():Promise<void>{
        
        //Event listeners must be registered BEFORE the event occurs
        //  this.page.on('dialog',async(alert)=>{
        //     alertText = alert.message();
        //     await this.page.waitForTimeout(2000);
        //     await alert.accept();
        // })
        await this.page.locator('button#login-button').click();
    }
}