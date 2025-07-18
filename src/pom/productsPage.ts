import { expect, type Locator, type Page } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly sauceLabsBackpack: Locator
    readonly sauceLabsBackpackUrl: string
    readonly addToCartButton: Locator
    readonly sortingMenu: Locator
    readonly inventoryItemPrice: Locator
    readonly inventoryItemName: Locator
    readonly inventoryItem: Locator
    readonly bikeLight: Locator
    readonly bikeLightAddToCart: Locator
    readonly sauceFleeceJacket: Locator
    readonly sauceFleeceJacketAddToCart: Locator
    readonly productUrl: string
    constructor(page: Page) {
        this.page = page
        this.productUrl = 'https://www.saucedemo.com/inventory.html'
        this.bikeLight = page.getByRole('link', { name: 'Sauce Labs Bike Light' }).first()
        this.bikeLightAddToCart = page.locator("#add-to-cart-sauce-labs-bike-light")

        this.sauceLabsBackpack = page.getByRole('link', { name: 'Sauce Labs Backpack' }).first()
        this.sauceLabsBackpackUrl = 'https://www.saucedemo.com/inventory-item.html?id=4'

        this.sauceFleeceJacket = page.getByRole('link', { name: 'Sauce Labs Fleece Jacket' }).first()
        this.sauceFleeceJacketAddToCart = page.locator('#add-to-cart-sauce-labs-fleece-jacket')

        this.addToCartButton = page.locator('[data-test="add-to-cart"]')

        this.sortingMenu = page.locator('[data-test="product-sort-container"]')

        this.inventoryItemPrice = page.locator('[data-test="inventory-item-price"]')
        this.inventoryItemName = page.locator('[data-test="inventory-item-name"]')
        this.inventoryItem = page.locator('[data-test="inventory-item"]')
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