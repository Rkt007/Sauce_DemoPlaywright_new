import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { BASE_URL, username, password } from "../utils/envConfig";
import { test, expect } from "@playwright/test";
import { productsToCart } from "./test-data/products";
import { CartPage } from "../pages/CartPage";

test.describe('Cart page validate', () => {

    let loginPage;
    let productPage;
    let cartPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(username, password);
    });

    // ✅ 1. Validate cart UI
    test('validate cart page url and ui element', async ({ page }) => {

        await productPage.addFirstProductToCart();
        await productPage.clickOnCartLink();

        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

        const ui = await cartPage.getCartPageElements();

        await expect(ui.cartTitle).toBeVisible();
        await expect(ui.shoppingCart).toBeVisible();
        await expect(ui.checkout).toBeVisible();
    });

    // ✅ 2. Continue shopping
    test('validate continue shopping functionality', async ({ page }) => {

        await productPage.addFirstProductToCart();
        await productPage.clickOnCartLink();

        await cartPage.clickContinueShopping();

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });

    // ✅ 3. Single product validation
    test('validate single product from cart page', async ({ page }) => {

        await productPage.addFirstProductToCart();
        const product = await productPage.getFirstProductDetails();

        await productPage.clickOnCartLink();

        const cartItems = await cartPage.getCartItemNames();

        expect(cartItems[0]).toContain(product.name);
    });

    // ✅ 4. All products validation
    test('validate all product added to the cart page', async ({ page }) => {

        await productPage.addAllProductsToCart();
        await productPage.clickOnCartLink();

        const cartItems = await cartPage.getCartItemNames();

        expect(cartItems.length).toBeGreaterThan(0);
    });

    // ✅ 5. Specific product validation
    test('validate specific product added to the cart page', async ({ page }) => {

        const productName = productsToCart[0];

        await productPage.addSpecificProductToCart(productName);
        await productPage.clickOnCartLink();

        const cartItems = await cartPage.getCartItemNames();

        expect(cartItems).toContain(productName);
    });

    // ✅ 6. Remove functionality
    test('validate remove functionality', async ({ page }) => {

        await productPage.addFirstProductToCart();
        await productPage.clickOnCartLink();

        const before = await cartPage.getCartItemNames();

        await cartPage.removeFirstItem();

        const after = await cartPage.getCartItemNames();

        expect(after.length).toBeLessThan(before.length);
    });

});