// storePage.ts
import { Page, Locator, expect } from '@playwright/test';

export class StorePage {
  readonly page: Page;
  readonly productSelect: Locator;
  readonly amountInput: Locator;
  readonly addToCartButton: Locator;
  readonly buyMessage: Locator;
  readonly buyButton: Locator;
  readonly nameInput: Locator;
  readonly addressInput: Locator;
  readonly confirmPurchaseButton: Locator;
  readonly cartItem: Locator;
  readonly thankYouText: Locator;
  readonly nameResult: Locator;
  readonly addressResult: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productSelect = page.getByTestId('select-product');
    this.amountInput = page.getByRole('textbox', { name: 'Amount' });
    this.addToCartButton = page.getByTestId('add-to-cart-button');
    this.buyMessage = page.getByTestId('buy-message');
    this.buyButton = page.getByRole('button', { name: 'Buy' });
    this.nameInput = page.getByRole('textbox', { name: 'Name:' });
    this.addressInput = page.getByRole('textbox', { name: 'Address:' });
    this.confirmPurchaseButton = page.getByRole('button', { name: 'Confirm Purchase' });
    this.cartItem = page.getByRole('listitem');
    this.thankYouText = page.getByText('Thank you for your purchase,');
    this.nameResult = page.locator('#name');
    this.addressResult = page.locator('#address');
    this.closeButton = page.getByText('Close');
  }

  async selectProduct(productId: string, amount: string) {
    await this.productSelect.selectOption(productId);
    await this.amountInput.fill(amount);
    await this.addToCartButton.click();
  }

  async expectAddedToCart(message: string) {
    await expect(this.buyMessage).toContainText(message);
  }

  async proceedToCheckout() {
    await this.buyButton.click();
  }

  async fillCustomerDetails(name: string, address: string) {
    await this.nameInput.fill(name);
    await this.addressInput.fill(address);
  }

  async confirmPurchase() {
    await this.confirmPurchaseButton.click();
  }

  async expectCartItem(text: string) {
    await expect(this.cartItem).toContainText(text);
  }

  async expectThankYou(name: string, address: string) {
    await expect(this.thankYouText).toBeVisible();
    await expect(this.nameResult).toContainText(`Thank you for your purchase, ${name}`);
    await expect(this.addressResult).toContainText(`It will be shipped to: ${address}`);
  }

  async closeDialog() {
    await this.closeButton.click();
  }
}
