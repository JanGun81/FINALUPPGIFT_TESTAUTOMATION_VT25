import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export class AccessibilityHelper {
  readonly page: Page;

    constructor(page: Page) {
    this.page = page;  
  }

  async runAccessibilityScan(selector: string = 'html') {
    const builder = new AxeBuilder({ page: this.page }).include(selector);
    return await builder.analyze();
}

}