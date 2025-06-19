import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutCompletePage {
    readonly page: Page;
    readonly completeHeader: Locator
    readonly completeHeaderMessage: string
    readonly approvalCheckImg: Locator
    readonly backHomeButton: Locator
    constructor(page: Page) {
        this.page = page

        this.completeHeader = page.locator('[data-test="complete-header"]')
        this.completeHeaderMessage = 'Thank you for your order!'
        this.approvalCheckImg = page.locator('[data-test="pony-express"]')
        this.backHomeButton = page.locator('#back-to-products')
    }
}