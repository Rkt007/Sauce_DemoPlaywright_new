import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { BASE_URL, username, password } from "../utils/envConfig";
import { test, expect } from "@playwright/test";
import { loginLocators } from "../locators/loginLocators";
import { productsToCart } from "./test-data/products";  

test.describe('product page validate', () => {

  let loginPage;
  let productPage;

  test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);

    await page.goto(BASE_URL);
    await loginPage.login(username, password);
  });

  test('validate about and navigate back', async ({ page }) => {

    await productPage.openAbout();

    await expect(page).toHaveURL(/saucelabs/);

    await page.goBack();
  });

  test('validate logout functionality', async ({ page }) => {

    await productPage.logout();

    // ✅ Correct locator usage
    await expect(page.locator(loginLocators.loginbutton)).toBeVisible();

  }); 

  test('verify product name description prices' ,async({page})=>{

    await productPage.validateAllProductDisplay();

  }) ;

  test('validate specific product to cart' ,async({page})=>{

    const productName = productsToCart[0];  // Add first product from the list
    await productPage.addSpecificProductToCart(productName);

  }) ;


test('filter by A to Z', async ({ page }) => {

  await productPage.filterByNameAtoZ();

  const names = await productPage.getProductNames();
  const sorted = [...names].sort();

  expect(names).toEqual(sorted);
});

 test('filter by Z to A', async ({ page }) => {

  await productPage.filterByNameZtoA();

  const names = await productPage.getProductNames();
  const sorted = [...names].sort().reverse();

  expect(names).toEqual(sorted);
});


test('filter by Price Low to High', async ({ page }) => {

  await productPage.filterByPriceLowToHigh();

  const prices = await productPage.getProductPrices();
  const sorted = [...prices].sort((a, b) => a - b);

  expect(prices).toEqual(sorted);
});


test('filter by Price High to Low', async ({ page }) => {

  await productPage.filterByPriceHighToLow();

  const prices = await productPage.getProductPrices();
  const sorted = [...prices].sort((a, b) => b - a);

  expect(prices).toEqual(sorted);


});




});