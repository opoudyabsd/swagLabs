import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage2 {
    readonly page: Page;
    readonly inventoryItemNameInfo: Locator
    readonly shippingInfo: Locator
    readonly itemPriceInfo: Locator
    readonly finishButton: Locator
    readonly title: Locator
    constructor(page: Page) {
        this.page = page
        this.title = page.locator('[data-test="title"]')
        this.inventoryItemNameInfo = page.locator('[data-test="inventory-item-name"]')
        this.shippingInfo = page.locator('[data-test="shipping-info-value"]')
        this.itemPriceInfo = page.locator('[data-test="subtotal-label"]')
        this.finishButton = page.getByRole('button', { name: "Finish" })

    }
}