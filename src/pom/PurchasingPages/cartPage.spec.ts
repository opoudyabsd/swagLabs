import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartPageUrl: string
    readonly itemQuantity: Locator
    readonly checkoutButton: Locator
    readonly inventoryItem: Locator
    readonly inventoryItemName: Locator
    readonly removingButton: Locator
    constructor(page: Page) {
        this.page = page
        this.cartPageUrl = 'https://www.saucedemo.com/cart.html'
        this.itemQuantity = page.locator('[data-test="item-quantity"]')
        this.checkoutButton = page.getByRole('button', { name: "Checkout" })
        this.inventoryItem = page.locator('[data-test="inventory-item"]')
        this.inventoryItemName = page.locator('[data-test="inventory-item-name"]')
        this.removingButton = page.locator('.btn.btn_secondary.btn_small.cart_button')
    }
}