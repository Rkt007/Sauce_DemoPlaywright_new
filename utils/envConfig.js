//export const Base_url ="https://www.saucedemo.com/" ;
export const ENV_URL = {
  dev: "https://www.saucedemo.com/",
  qa: "https://www.saucedemo.com/",
  prod: "https://www.saucedemo.com/",
  stage: "https://www.saucedemo.com/"
};

const ENV = process.env.ENV || "prod";

// ✅ JS way (no type casting)
export const BASE_URL = ENV_URL[ENV];

export const username = "standard_user";
export const password = "secret_sauce";