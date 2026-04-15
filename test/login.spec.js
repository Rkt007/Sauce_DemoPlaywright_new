
import { BASE_URL ,username ,password} from "../utils/envConfig";
import { LoginPage } from "../pages/LoginPage";
import {test ,expect} from "@playwright/test" ;


test('login to sauce demo application with valid credential', async ({ page }) => {

  const user1 = new LoginPage(page);

  await page.goto(BASE_URL);

  await user1.login(username, password);

});



  