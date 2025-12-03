import { test, expect } from '@playwright/test';
import { StorePage } from '../pages/storePage';

test.describe('Store tests', () => {
  let storePage: StorePage;

  test.beforeEach(async ({ page }) => {
    storePage = new StorePage(page);
    await page.goto('/store2');
  });

  test('Purchase from store', async () => {
    // Act & Assert 
    await storePage.selectProduct('1', '5');
    await storePage.expectAddedToCart('Added 5 x Apple to cart.');
    await storePage.proceedToCheckout();
    await storePage.fillCustomerDetails('Jan Gundersen', 'Ekängsgatan 13');
    await storePage.confirmPurchase();
    await storePage.expectCartItem('5 x Apple - $75');
    await storePage.expectThankYou('Jan Gundersen', 'Ekängsgatan 13');
    await storePage.closeDialog();
  });

  test('Store2 page accessibility test html_language', async () => {
    // Act
    const results = await storePage.runAccessibilityTestStore2();
    // Assert
    console.log('Accessibility violations:', results.violations);
    const contrastIssues = results.violations.filter((v: { id: string; }) => v.id === 'html-has-lang');
    // Here we expect that there are html-has-lang issues on the store page - however
    // if the html-has-lang issue is fixed, this test will fail but should then have
    // a positive test result with html language issues found (i.e. toBe(0)).
    expect(contrastIssues.length, 'HTML language issue should be detected').toBeGreaterThan(0);
    expect(results.violations.find(v => v.id === 'html-has-lang')).toBeDefined();
  });
});