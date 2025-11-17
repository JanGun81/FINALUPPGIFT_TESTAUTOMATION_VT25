import test, { expect } from "@playwright/test";

test("Buy insurance", async ({ page }) => {
  await page.goto('https://hoff.is/insurance');
  await page.waitForTimeout(2000);
})

test("Insurance form", async ({ page }) => {
  // Arrange
  // Act
  await page.goto('https://hoff.is/insurance');
  await page.getByPlaceholder('First Name').fill('John');
  await page.getByPlaceholder('Last name').fill('Doe');
  await page.getByPlaceholder('1234 Main St').fill('Storgatan 51');
  await page.getByPlaceholder('Apartment Size').fill('100');
  await page.getByLabel('Adults').fill('2');
  await page.getByLabel('Kids').fill('2');
  await page.selectOption('#inputCoverage', { label: '50%' });
  await page.getByRole('button', { name: 'Calculate Price' }).click();
  await page.waitForTimeout(3000);
  // Assert
  await expect(page.locator('#monthly')).toContainText('117.5');
  await expect(page.locator('#yearly')).toContainText('1410');
});

test('Name validation', async ({ page }) => {
  // Arrange - none
  // Act 
  // - verify first and last name of purchase
  // - Select 50% insurance coverage
  await page.goto('https://hoff.is/insurance');
  await page.getByPlaceholder('First Name').fill('John');
  await page.getByPlaceholder('Last name').fill('Doe');
  await page.selectOption('#inputCoverage', { label: '50%' });
  await page.getByRole('button', { name: 'Calculate Price' }).click();
  // Assert
  await expect(page.getByPlaceholder('First Name')).toHaveValue('John');
  await expect(page.getByPlaceholder('Last name')).toHaveValue('Doe');
});