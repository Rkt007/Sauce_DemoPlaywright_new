import { cartPageLocators } from "../locators/cartPageLocators";

export class CartPage {

    constructor(page) {
        this.page = page;
    }

    async clickContinueShopping() {
        await this.page.locator(cartPageLocators.continueShoppingButton).click();
    }

    async getCartPageElements() {
        return {
            cartTitle: this.page.locator(cartPageLocators.cartTitle),
            shoppingCart: this.page.locator(cartPageLocators.continueShoppingButton),
            checkout: this.page.locator(cartPageLocators.checkout),
        }
    }

    async getCartProducts() {
        const names = await this.page.locator(cartPageLocators.productName).allTextContents();
        const descriptions = await this.page.locator(cartPageLocators.productDescription).allTextContents();
        const prices = await this.page.locator(cartPageLocators.productPrice).allTextContents();

        const allProducts = names.map((name, i) => ({
            name: name.trim(),
            description: descriptions[i].trim(),
            price: prices[i].trim()
        }));

        return allProducts;
    }

    async getCartItemNames() {
        return await this.page.locator(cartPageLocators.productName).allTextContents();
    }

    async removeFirstItem() {
        await this.page.locator(cartPageLocators.remove).first().click();
    }

    async clickCheckout() {
        await this.page.locator(cartPageLocators.checkout).click();
    }

    async clickOnCheckOutButton() {

        await this.page.locator(CartPage.checkout).click();
    }
}