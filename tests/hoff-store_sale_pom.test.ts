import { test, expect } from '@playwright/test';
import { StorePage } from '../pages/storePage';

test.beforeEach(async ({ page }) => {
  await page.goto('/store2');
});

test('Purchase from store', async ({ page }) => {
    // Arrange
    const instPage = new StorePage(page);
    // Act & Assert
    await instPage.selectProduct('1', '5');
    await instPage.expectAddedToCart('Added 5 x Apple to cart.');
    await instPage.proceedToCheckout();
    await instPage.fillCustomerDetails('Jan Gundersen', 'Ekängsgatan 13');
    await instPage.confirmPurchase();
    await instPage.expectCartItem('5 x Apple - $75');
    await instPage.expectThankYou('Jan Gundersen', 'Ekängsgatan 13');
    await instPage.closeDialog();
});