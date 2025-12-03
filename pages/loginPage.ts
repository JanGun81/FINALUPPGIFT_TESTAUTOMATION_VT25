// loginPage.ts
import { expect, Locator, Page } from '@playwright/test';
import { AccessibilityHelper } from '../utils/accessibilityHelper';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly roleSelect: Locator;
  readonly loginButton: Locator;
  readonly loginButtonSel: string;
  readonly urlLogin: string = 'https://hoff.is/login/';
  readonly urlStore: string = 'https://hoff.is/store2/';
  readonly errorMessage: Locator;
  readonly noFilledMessage: Locator;
  private accessibilityHelper: AccessibilityHelper;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.roleSelect = page.getByLabel('Select Role');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.loginButtonSel = 'button';
    this.errorMessage = page.getByText('Incorrect password');
    this.noFilledMessage = page.getByText('Please fill in all fields.');
    this.accessibilityHelper = new AccessibilityHelper(page);
  }

  async goto() {
    await this.page.goto(this.urlLogin);
  }

  async successfullLogin(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.roleSelect.selectOption('Consumer');
    await this.loginButton.click();
    await expect(this.page).toHaveURL(this.urlStore);
  }

  async failedLogin(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.roleSelect.selectOption('Consumer');
    await this.loginButton.click();
    await expect(this.page).toHaveURL(this.urlLogin);
    await expect(this.errorMessage).toBeVisible();
  }

  async missingFieldsLogin(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.roleSelect.selectOption('Consumer');
    await this.loginButton.click();
    await expect(this.page).toHaveURL(this.urlLogin);
    await expect(this.noFilledMessage).toBeVisible();
  }
  
  async runAccessibilityScanButton() {
    // Page object for accessibility test for login button (WCAG 2 AA color contrast)
    return await this.accessibilityHelper.runAccessibilityScan(this.loginButtonSel);
  }  

}
