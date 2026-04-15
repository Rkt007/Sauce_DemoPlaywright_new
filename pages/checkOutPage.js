import { checkoutLocator } from "../locators/checkoutPageLocators";
import { checkoutData } from "../test/test-data/checkoutData";

export class CheckOutPage {

  constructor(page) {
    this.page = page;
  }

  async getCheckoutElements() {
    return {
      pageInfo: this.page.locator(checkoutLocator.pageInfo),
      cancel: this.page.locator(checkoutLocator.cancelButton),
      continueBtn: this.page.locator(checkoutLocator.continueButton)
    };
  }

  async fillCheckoutDetails(firstName, lastName, zipCode) {
    await this.page.fill(checkoutLocator.firstName, firstName);
    await this.page.fill(checkoutLocator.lastName, lastName);
    await this.page.fill(checkoutLocator.zipCode, zipCode);
  }

  async clickCancel() {
    await this.page.click(checkoutLocator.cancelButton);
  }

  async clickContinue() {
    await this.page.click(checkoutLocator.continueButton);
  }
}