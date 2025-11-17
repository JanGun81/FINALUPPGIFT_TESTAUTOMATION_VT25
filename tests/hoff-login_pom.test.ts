// login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
});

test.describe('Login tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully', async ({ page }) => {
    await loginPage.successfullLogin('Jan', 'sup3rs3cr3t');
  });

  test('should login unsuccessfully', async ({ page }) => {
    await loginPage.failedLogin('Jan', 'supersecret');
  });

  test('No fields filled', async ({ page }) => {
    await loginPage.missingFieldsLogin('', '');
  });

});
