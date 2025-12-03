import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export class AccessibilityHelper {
  readonly page: Page;
  //readonly htmlElement: string;
  //readonly loginButton: string;

    constructor(page: Page) {
    this.page = page;
    //this.htmlElement = 'html';
    //this.loginButton = 'button';    
  }

  async runAccessibilityScan(selector: string = 'html') {
    const builder = new AxeBuilder({ page: this.page }).include(selector);
    return await builder.analyze();
}

}