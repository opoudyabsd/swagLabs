import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly title: Locator
    readonly cartPageUrl: string
    readonly itemQuantity: Locator
    readonly checkoutButton: Locator
    readonly inventoryItem: Locator
    readonly inventoryItemName: Locator
    constructor(page: Page) {
        this.page = page
        this.title = page.locator('[data-test="title"]')
        this.cartPageUrl = 'https://www.saucedemo.com/cart.html'
        this.itemQuantity = page.locator('[data-test="item-quantity"]')
        this.checkoutButton = page.getByRole('button', { name: "Checkout" })
        this.inventoryItem = page.locator('[data-test="inventory-item"]')
        this.inventoryItemName = page.locator('[data-test="inventory-item-name"]')
    }
}