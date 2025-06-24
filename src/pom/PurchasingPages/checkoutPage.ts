import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CheckoutPage {
    readonly page: Page;
    readonly firstName: Locator
    readonly lastName: Locator
    readonly postalCode: Locator
    readonly continueButton: Locator
    readonly errorMessageLocator: Locator
    readonly checkoutUrl: string
    constructor(page: Page) {
        this.checkoutUrl = 'https://www.saucedemo.com/checkout-step-one.html'
        this.page = page
        this.firstName = page.locator('#first-name')
        this.lastName = page.locator('#last-name')
        this.postalCode = page.locator('#postal-code')
        this.continueButton = page.locator('#continue')
        this.errorMessageLocator = page.locator('[data-test="error"]')

    }
    async fillCheckoutInformationManual(firstname, lastname, zipcode) {
        await this.firstName.fill(firstname)
        await this.lastName.fill(lastname)
        await this.postalCode.fill(zipcode)
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