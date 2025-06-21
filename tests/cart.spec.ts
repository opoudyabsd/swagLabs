import { test, expect } from '@playwright/test';
import { loginToLab } from './../utils/loginTo'
import { ProductPage } from "../pom/productsPage.spec"
import { CartPage } from '../pom/PurchasingPages/cartPage.spec';
import { HeaderComponent } from '../pom/headers/headersComponent.spec';

test.describe('Cart functionality', () => {
    test.beforeEach(async ({ page }) => {
        await loginToLab(page)
    })
    test('Verify functionality of adding then deleting item from cart', async ({ page }) => {
        const productPage = new ProductPage(page)
        const cartPage = new CartPage(page)
        const headerComponent = new HeaderComponent(page)
        await test.step("User on the products page", async () => {
            await expect(headerComponent.title).toHaveText("Products")
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        })
        await test.step('Click “Add to cart” button for the product (ex: Sauce Labs Fleece Jacket)', async () => {
            await productPage.sauceFleeceJacketAddToCart.click()
        })
        await test.step('Verify that number of items at the top right corner icon is increased by 1', async () => {
            await expect(headerComponent.shoppingCartBadge).toHaveText('1')
        })
        await test.step("Click on the top right cart icon", async () => {
            await headerComponent.shoppingCartLink.click()
        })
        await test.step("User is redirected to the cart page", async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
            await expect(headerComponent.title).toHaveText('Your Cart')
        })
        await test.step("Pre-selected product should be visible at the product item page", async () => {
            await expect(cartPage.inventoryItemName).toHaveText('Sauce Labs Fleece Jacket')
            await expect(cartPage.itemQuantity).toHaveText("1")
        })
        await test.step('Click “Remove” button in the section of the purchased product', async () => {
            await cartPage.removingButton.click()
        })
        await test.step("Verify that cart page doesn't contain any product", async () => {
            await expect(cartPage.inventoryItem).not.toBeVisible()
        })
        await test.step('Verify that number of product at the right top corner cart icon is 0', async () => {
            await expect(headerComponent.shoppingCartBadge).not.toBeVisible()
        })
    })

    test("Does the cart save information about item in cart after a reload page", async ({ page }) => {
        const productPage = new ProductPage(page)
        const cartPage = new CartPage(page)
        const headerComponent = new HeaderComponent(page)
        await test.step("User on the products page", async () => {
            await expect(headerComponent.title).toHaveText("Products")
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        })
        await test.step('Click “Add to cart” button for the product (ex: Sauce Labs Bike Light)', async () => {
            await productPage.bikeLightAddToCart.click()
        })
        await test.step('Verify that number of items at the top right corner icon is increased by 1', async () => {
            await expect(headerComponent.shoppingCartBadge).toHaveText('1')
        })
        await test.step("Click on the top right cart icon", async () => {
            await headerComponent.shoppingCartLink.click()
        })
        await test.step("User is redirected to the cart page", async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
            await expect(headerComponent.title).toHaveText('Your Cart')
        })
        await test.step("Pre-selected product should be visible at the product item page", async () => {
            await expect(cartPage.inventoryItemName).toHaveText('Sauce Labs Bike Light')
            await expect(cartPage.itemQuantity).toHaveText("1")
        })
        await test.step("Reload page", async () => {
            await page.reload();
            await page.waitForLoadState()
        })
        await test.step("User remains on the Cart page after reload", async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
            await expect(headerComponent.title).toHaveText('Your Cart')
        })
        await test.step('Pre-selected product is visible in the product cart page', async () => {
            await expect(cartPage.inventoryItemName).toHaveText('Sauce Labs Bike Light')
            await expect(cartPage.itemQuantity).toHaveText("1")
        })
    })
    test('Does the cart save information about items in cart after logout and login to the account', async ({ page }) => {
        const productPage = new ProductPage(page)
        const cartPage = new CartPage(page)
        const headerComponent = new HeaderComponent(page)

        await test.step("User on the products page", async () => {
            await expect(headerComponent.title).toHaveText("Products")
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        })
        await test.step('Click “Add to cart” button for the product (ex: Sauce Labs Bike Light)', async () => {
            await productPage.bikeLightAddToCart.click()
        })
        await test.step('Verify that number of items at the top right corner icon is increased by 1', async () => {
            await expect(headerComponent.shoppingCartBadge).toHaveText('1')
        })
        await test.step("Click on the top right cart icon", async () => {
            await headerComponent.shoppingCartLink.click()
        })
        await test.step("User is redirected to the cart page", async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
            await expect(headerComponent.title).toHaveText('Your Cart')
        })
        await test.step("Pre-selected product should be visible at the product item page", async () => {
            await expect(cartPage.inventoryItemName).toHaveText('Sauce Labs Bike Light')
            await expect(cartPage.itemQuantity).toHaveText("1")
        })
        await test.step('Click on the sidebar menu button on the left top corner', async () => {
            await headerComponent.sightBarMenuButton.click()
        })
        await test.step('Verify that sidebar menu is visible', async () => {
            await expect(headerComponent.sightBarMenu).toBeVisible()
        })
        await test.step('Click on the “Logout” button', async () => {
            await headerComponent.sightBarMenuLogoutButton.click()
        })
        await test.step('Verify that user is redirected to the login page', async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/')
        })
        await test.step('Log in again with the same valid credentials', async () => {
            await loginToLab(page)
        })
        await test.step('Verify that user is on the product page', async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
            await expect(headerComponent.title).toHaveText("Products")
        })
        await test.step('Click on the Cart icon at the top right corner', async () => {
            await headerComponent.shoppingCartLink.click()
        })
        await test.step('Verify that user is on the cart page', async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
            await expect(headerComponent.title).toHaveText('Your Cart')
        })
        await test.step('Pre-selected product is remains at the cart page', async () => {
            await expect(cartPage.inventoryItemName).toHaveText('Sauce Labs Bike Light')
            await expect(cartPage.itemQuantity).toHaveText("1")
        })
        await test.step('Number of items in the cart icon remains the same as number of item in the product section at the cart page', async () => {
            const numberOfCartItems = await headerComponent.shoppingCartBadge.textContent()
            const numberOfItems = await productPage.inventoryItem.count()
            expect(Number(numberOfCartItems)).toEqual(numberOfItems)
        })
    })
})