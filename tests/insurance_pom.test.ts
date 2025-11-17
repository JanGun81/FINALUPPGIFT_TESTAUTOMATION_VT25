import test, { expect } from "@playwright/test";
import { InsurancePage } from "../pages/insurancePage";

test.beforeEach(async ({ page }) => {
  await page.goto('/insurance');
});

test("Buy Insurance 100kvm", async ({ page }) => {
  // Arrange
  const insPage = new InsurancePage(page);
  // Act
  await insPage.fillName("Jan", "Gundersen");
  await insPage.fillAdressDetails("Ekängsen 12", "107");
  await insPage.fillResidents();
  await insPage.selectCoverage('100%');
  await insPage.calculatePrice(2000);
  
  // Assert
  await expect(await insPage.validateMonthly()).toBe(true);
  await expect(await insPage.validateYearly()).toBe(true);
});

test("Buy Insurance 200kvm", async ({ page }) => {
  // Arrange
  const insPage = new InsurancePage(page);
  // Act
  await insPage.fillName("Jan", "Gundersen");
  await insPage.fillAdressDetails("Ekängsen 12", "107");
  await insPage.fillResidents(4, 2);
  await insPage.selectCoverage('100%');
  await insPage.calculatePrice(2000);
  
  // Assert
  await expect(await insPage.validateMonthly("215")).toBe(true);
  await expect(await insPage.validateYearly("2580")).toBe(true);
});
