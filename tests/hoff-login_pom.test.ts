// login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

let password: string;

test.describe('Login tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully', async ({ page }) => {    
    if(process.env.PASSWORD !== undefined) {
      password = process.env.PASSWORD;
    } 
    await loginPage.successfullLogin('Jan', password);
  });

  test('should login unsuccessfully', async ({ page }) => {
    await loginPage.failedLogin('Jan', 'supersecret');
  });

  test('No fields filled', async ({ page }) => {
    await loginPage.missingFieldsLogin('', '');
  });

});
