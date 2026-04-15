import { loginLocators } from "../locators/loginLocators";

export class LoginPage {

    constructor(page) {
        this.page = page;
    }

    async login(username, password) {
        await this.page.fill(loginLocators.userInput, username);
        await this.page.fill(loginLocators.userpassword, password);
        await this.page.click(loginLocators.loginbutton);
    }
}