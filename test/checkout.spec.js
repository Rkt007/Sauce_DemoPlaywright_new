import { LoginPage } from "../pages/LoginPage";
import { BASE_URL, username, password } from "../utils/envConfig";
import { test, expect } from "@playwright/test";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { checkoutData } from "./test-data/checkoutData";
import { CheckOutPage } from "../pages/checkOutPage";

test.describe('Checkout page validate', () => {

    let loginPage;
    let productPage;
    let cartPage;
    let checkOutPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkOutPage = new CheckOutPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(username, password);
        await productPage.addFirstProductToCart();
        await productPage.clickOnCartLink();
    });

    // ✅ 1. UI + URL Validation
    test('validate ui elements and url', async ({ page }) => {

        await cartPage.clickCheckout(); // ✅ from CartPage

        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

        const elements = await checkOutPage.getCheckoutElements();

        await expect(elements.pageInfo).toBeVisible();
        await expect(elements.cancel).toBeVisible();
        await expect(elements.continueBtn).toBeVisible();
    });

    // ✅ 2. Cancel functionality
    test('validate cancel button functionality', async ({ page }) => {

        await cartPage.clickCheckout();

        await checkOutPage.clickCancel();

        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    });

    // ✅ 3. Continue functionality
    test('validate continue functionality', async ({ page }) => {

        await cartPage.clickCheckout();

        await checkOutPage.fillCheckoutDetails(
            checkoutData.firstName,
            checkoutData.lastName,
            checkoutData.zipCode
        );

        await checkOutPage.clickContinue();

        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    });

});