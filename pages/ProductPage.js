import { error } from "node:console";
import { ProductPageLocators } from "../locators/ProductPageLocators";
import { productsToCart } from "../test/test-data/products";

export class ProductPage {

  constructor(page) {
    this.page = page;
  }



  async openAbout() {
    await this.page.click(ProductPageLocators.settingIcon);
    await this.page.click(ProductPageLocators.aboutLink);
  }

  async logout() {
    await this.page.click(ProductPageLocators.settingIcon);
    await this.page.click(ProductPageLocators.logoutLink);
  }

  async validateAllProductDisplay() {

    const names = await this.page.locator(ProductPageLocators.productName).allTextContents();
    const description = await this.page.locator(ProductPageLocators.productDescription).allTextContents();
    const prices = await this.page.locator(ProductPageLocators.productPrice).allTextContents();
    const buttonCount = await this.page.locator(ProductPageLocators.addToCart).count();

    if (names.length === 0) {
      throw new Error("No product found");
    }

    if (
      names.length !== description.length ||
      names.length !== prices.length ||
      names.length !== buttonCount) {
      throw new Error("Mismatch between product details");
    }
  }

  async addFirstProductToCart() {
    await this.page.locator(ProductPageLocators.addToCart).first().click();
  }

  async addAllProductsToCart() {

    const buttons = this.page.locator(ProductPageLocators.addToCart);
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      await buttons.nth(i).click(); // stable approach
    }
  }

  async addSpecificProductToCart(productName) {

    const products = this.page.locator(ProductPageLocators.productName);
    const count = await products.count();

    for (let i = 0; i < count; i++) {

      const name = await products.nth(i).textContent();

      if (name && name.trim().includes(productName)) {

        await this.page.locator(ProductPageLocators.addToCart).nth(i).click();
        break; // stop after finding product
      }
    }
  }

  async filterByNameAtoZ() {
    await this.page.selectOption(ProductPageLocators.sortDropdown, 'az');
  }

  async filterByNameZtoA() {
    await this.page.selectOption(ProductPageLocators.sortDropdown, 'za');
  }

  async filterByPriceLowToHigh() {
    await this.page.selectOption(ProductPageLocators.sortDropdown, 'lohi');
  }

  async filterByPriceHighToLow() {
    await this.page.selectOption(ProductPageLocators.sortDropdown, 'hilo');
  }

  async getProductNames() {
    return await this.page.locator(ProductPageLocators.productName).allTextContents();
  }

  async getProductPrices() {
    const prices = await this.page.locator(ProductPageLocators.productPrice).allTextContents();
    return prices.map(price => parseFloat(price.replace('$', '').trim()));
  }

  async clickOnCartLink() {

    await this.page.locator(ProductPageLocators.cartLink).click();
  }

  async getFirstProductDetails() {
    const name = await this.page.locator(ProductPageLocators.productName).first().textContent();
    const description = await this.page.locator(ProductPageLocators.productDescription).first().textContent();
    const price = await this.page.locator(ProductPageLocators.productPrice).first().textContent();

    return {
      name: name.trim(),
      description: description.trim(),
      price: price.trim()
    };
  }
}