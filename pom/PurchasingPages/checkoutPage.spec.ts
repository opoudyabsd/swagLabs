import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CheckoutPage {
    readonly page: Page;
    readonly firstName: Locator
    readonly lastName: Locator
    readonly postalCode: Locator
    readonly continueButton: Locator
    readonly errorMessageLocator: Locator
    constructor(page: Page) {
        this.page = page
        this.firstName = page.locator('#first-name')
        this.lastName = page.locator('#last-name')
        this.postalCode = page.locator('#postal-code')
        this.continueButton = page.locator('#continue')
        this.errorMessageLocator = page.locator('[data-test="error"]')

    }
    async fillCheckoutInformation() {
        await this.firstName.fill(faker.person.firstName())
        await this.lastName.fill(faker.person.lastName())
        await this.postalCode.fill(faker.location.zipCode())
    }
    async fillWithEmptySpaces() {
        await this.firstName.fill("      ")
        await this.lastName.fill("      ")
        await this.postalCode.fill("     ")
    }
}