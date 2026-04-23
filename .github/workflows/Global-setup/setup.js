// global-setup.js
import { chromium }  from('@playwright/test');

async function globalSetup(config) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Example: Login
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#username', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('button[type=submit]'); 



  // Save session
  await page.context().storageState({ path: 'storageState.json' });

  await browser.close();
}

export default  globalSetup;