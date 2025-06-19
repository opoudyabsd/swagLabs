import { expect, type Locator, type Page } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly sauceLabsBackpack: Locator
    readonly sauceLabsBackpackUrl: string
    readonly addToCartButton: Locator
    readonly shoppingCartBadge: Locator
    readonly shoppingCartLink: Locator
    readonly sortingMenu: Locator
    readonly inventoryItemPrice: Locator
    readonly inventoryItemName: Locator
    constructor(page: Page) {
        this.page = page
        this.sauceLabsBackpack = page.getByRole('link', { name: 'Sauce Labs Backpack' }).first()
        this.sauceLabsBackpackUrl = 'https://www.saucedemo.com/inventory-item.html?id=4'
        this.addToCartButton = page.locator('[data-test="add-to-cart"]')
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]')
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]')
        this.sortingMenu = page.locator('[data-test="product-sort-container"]')
        this.inventoryItemPrice = page.locator('[data-test="inventory-item-price"]')
        this.inventoryItemName = page.locator('[data-test="inventory-item-name"]')
    }
    async replaceFunction(item) {
        return item.map(text => {
            return parseFloat(text.replace(/[^0-9.]/g, ""))
        })
    }
    async priceFilterLowHigh() {
        let price = await this.inventoryItemPrice.allTextContents()
        let pricesList = await this.replaceFunction(price)
        let sortedPrices = pricesList.sort((a, b) => a - b)
        await this.sortingMenu.selectOption('lohi')
        await this.page.waitForTimeout(1000)
        let sortedPriceElements = await this.inventoryItemPrice.allTextContents()
        const sortedUiPrices = await this.replaceFunction(sortedPriceElements)
        expect(sortedUiPrices).toEqual(sortedPrices)
    }
    async priceFilterHighLow() {
        let price = await this.inventoryItemPrice.allTextContents()
        let pricesList = await this.replaceFunction(price)
        let sortedPrices = pricesList.sort((a, b) => b - a)
        await this.sortingMenu.selectOption('hilo')
        let sortedPriceElements = await this.inventoryItemPrice.allTextContents()
        const sortedUiPrices = await this.replaceFunction(sortedPriceElements)
        expect(sortedUiPrices).toEqual(sortedPrices)
    }
    async alphabeticalOrder() {
        let names = await this.inventoryItemName.allTextContents()
        let alphabeticalSort = names.sort()
        await this.sortingMenu.selectOption('az')
        let sortedElements = await this.inventoryItemName.allTextContents()
        expect(alphabeticalSort).toEqual(sortedElements)
    }
    async descendingAlphabeticalOrder() {
        let names = await this.inventoryItemName.allTextContents()
        let alphabeticalSort = names.sort().reverse()
        await this.sortingMenu.selectOption('za')
        let sortedElements = await this.inventoryItemName.allTextContents()
        expect(alphabeticalSort).toEqual(sortedElements)
    }


}