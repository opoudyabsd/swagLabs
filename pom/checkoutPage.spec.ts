import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CheckoutPage {
    readonly page: Page;
    readonly sauceLabsBackpack: Locator
    readonly sauceLabsBackpackUrl: string
    readonly addToCartButton: Locator
    readonly shoppingCartBadge: Locator
    readonly shoppingCartLink: Locator
    readonly title: Locator
    readonly cartPageUrl: string
    readonly itemQuantity: Locator
    readonly checkoutButton: Locator
    readonly firstName: Locator
    readonly lastName: Locator
    readonly postalCode: Locator
    readonly continueButton: Locator
    readonly inventoryItemNameInfo: Locator
    readonly shippingInfo: Locator
    readonly itemPriceInfo: Locator
    readonly finishButton: Locator
    readonly completeHeader: Locator
    readonly completeHeaderMessage: string
    readonly approvalCheckImg: Locator
    readonly backHomeButton: Locator
    readonly errorMessageLocator: Locator
    constructor(page: Page) {
        this.page = page
        this.sauceLabsBackpack = page.getByRole('link', { name: 'Sauce Labs Backpack' }).first()
        this.sauceLabsBackpackUrl = 'https://www.saucedemo.com/inventory-item.html?id=4'
        this.addToCartButton = page.locator('[data-test="add-to-cart"]')
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]')
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]')
        this.title = page.locator('[data-test="title"]')
        this.cartPageUrl = 'https://www.saucedemo.com/cart.html'
        this.itemQuantity = page.locator('[data-test="item-quantity"]')
        this.checkoutButton = page.getByRole('button', { name: "Checkout" })
        this.firstName = page.locator('#first-name')
        this.lastName = page.locator('#last-name')
        this.postalCode = page.locator('#postal-code')
        this.continueButton = page.locator('#continue')
        this.inventoryItemNameInfo = page.locator('[data-test="inventory-item-name"]')
        this.shippingInfo = page.locator('[data-test="shipping-info-value"]')
        this.itemPriceInfo = page.locator('[data-test="subtotal-label"]')
        this.finishButton = page.getByRole('button', { name: "Finish" })
        this.completeHeader = page.locator('[data-test="complete-header"]')
        this.completeHeaderMessage = 'Thank you for your order!'
        this.approvalCheckImg = page.locator('[data-test="pony-express"]')
        this.backHomeButton = page.locator('#back-to-products')
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