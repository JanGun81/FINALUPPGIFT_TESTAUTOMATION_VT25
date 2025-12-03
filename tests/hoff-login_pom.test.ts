import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

let password: string;

test.describe('Login tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('/login');  
  });

  test('should login successfully', async () => {   
    // A positive test that checks that the user is redirected to the store page after successful login
    if(process.env.PASSWORD !== undefined) {
      password = process.env.PASSWORD;
    } 
    await loginPage.successfullLogin('Jan', password);
  });

  test('should login unsuccessfully', async () => {
    // A negative test that checks that the error message is correct
    await loginPage.failedLogin('Jan', 'supersecret');
    expect(await loginPage.errorMessage).toHaveText('Incorrect password');
  });

  test('No fields filled', async () => {
    // A negative test that checks that the error message is correct
    await loginPage.missingFieldsLogin('', '');
    expect(await loginPage.noFilledMessage).toHaveText('Please fill in all fields.');
  });

  test('Login button should fail WCAG 2 AA color contrast', async () => {
    // Accessibility test for incorrect button color contrast - this is expected to pass on failure
    // Act
    const results = await loginPage.runAccessibilityScanButton();
    //Assert
    console.log('Accessibility violations:', results.violations);
    const contrastIssues = results.violations.filter((v: { id: string; }) => v.id === 'color-contrast');
    // Here we expect that there are contrast issues on the login button - however
    // if the button color contrast is fixed, this test will fail but should then have
    // a positive test result with no contrast issues found (i.e. toBe(0)).
    expect(contrastIssues.length, 'Contrast issue should be detected').toBeGreaterThan(0);
    expect(results.violations.find(v => v.id === 'color-contrast')).toBeDefined();
  });

});
