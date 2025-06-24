import { test, expect } from '@playwright/test';
import { loginToLab } from './../utils/loginTo'
import { ProductPage } from '../pom/productsPage';
test.describe("Product sorting functionality", () => {
    test.beforeEach(async ({ page }) => {
        await loginToLab(page)
    })
    test("Sorting product by price from low to high", async ({ page }) => {
        const productPage = new ProductPage(page)
        await test.step("Navigate to the product page", async () => {
            await expect(page).toHaveURL(productPage.productUrl)
        })
        await test.step("Open sort dropdown menu and implement sorting", async () => {
            await productPage.priceFilterLowHigh()
        })
    })
    test("Sorting product by price from high to low", async ({ page }) => {
        const productPage = new ProductPage(page)
        await test.step("Navigate to the product page", async () => {
            await expect(page).toHaveURL(productPage.productUrl)
        })
        await test.step("Open sort dropdown menu and implement sorting", async () => {
            await productPage.priceFilterHighLow()
        })
    })
    test("Sorting in descending alphabetical order (Z - A)", async ({ page }) => {
        const productPage = new ProductPage(page)
        await test.step("Navigate to the product page", async () => {
            await expect(page).toHaveURL(productPage.productUrl)
        })
        await test.step("Open sort dropdown menu and implement sorting", async () => {
            await productPage.descendingAlphabeticalOrder()
        })

    })
    test("Sorting in alphabetical order (A - Z)", async ({ page }) => {
        const productPage = new ProductPage(page)
        await test.step("Navigate to the product page", async () => {
            await expect(page).toHaveURL(productPage.productUrl)
        })
        await test.step("Open sort dropdown menu and implement sorting", async () => {
            await productPage.alphabeticalOrder()
        })
    })
})