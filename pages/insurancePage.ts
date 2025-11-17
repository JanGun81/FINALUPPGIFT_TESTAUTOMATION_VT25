import { Locator, Page } from '@playwright/test';

export class InsurancePage {
    // locators
    readonly page: Page;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly addressField: Locator;
    readonly apartmentSizeField: Locator;
    readonly AdultsField: Locator;
    readonly KidsField: Locator;
    readonly coverageSelect: Locator;
    readonly calculatePriceButton: Locator;
    readonly resultMonthly: Locator;
    readonly resultYearly: Locator;
    // all elements we want to interact with
    
    constructor(page: Page) {
    this.page = page;    
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last name');
    this.addressField = page.getByPlaceholder('1234 Main St');
    this.apartmentSizeField = page.getByPlaceholder('Apartment Size');
    this.AdultsField = page.getByLabel('Adults');
    this.KidsField = page.getByLabel('Kids');
    this.coverageSelect = page.locator('#inputCoverage');
    this.calculatePriceButton = page.getByRole('button', { name: 'Calculate Price' });
    this.resultMonthly = page.locator('#monthly');
    this.resultYearly = page.locator('#yearly');
    }
    
    // All interactions with the page
    async fillName(firstName: string = 'John', lastName: string = 'Doe')
    {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
    }

    async fillAdressDetails(adress: string = 'Storgatan 51', apartmentSize: string = '100')
    {
        await this.addressField.fill(adress);
        await this.apartmentSizeField.fill(apartmentSize);
    }

    async fillResidents(adults: number = 2, kids: number = 4)
    {
        await this.AdultsField.fill(String(adults));
        await this.KidsField.fill(String(kids));
    }

    async selectCoverage(coverage: string = '100%')
    {
        await this.coverageSelect.selectOption(coverage);
    }

    async calculatePrice(pageWait: number = 3000)
    {
        await this.calculatePriceButton.click();
        await this.page.waitForTimeout(pageWait);
    }

async validateMonthly(expectedMonthly: string = '225'): Promise<boolean>
{
    const text = await this.resultMonthly.textContent();
    const numberOnly = text?.replace(/[^\d.]/g, '') || '';
    return numberOnly === expectedMonthly;
}

async validateYearly(expectedYearly: string = '2700'): Promise<boolean>
{
    const text = await this.resultYearly.textContent();
    const numberOnly = text?.replace(/[^\d.]/g, '') || '';
    return numberOnly === expectedYearly;
}

}