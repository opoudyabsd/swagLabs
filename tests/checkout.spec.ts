import { test, expect } from '@playwright/test';
import { loginToLab } from './../utils/loginTo'
import { CheckoutPage } from '../pom/PurchasingPages/checkoutPage.spec';
import { CheckoutCompletePage } from "../pom/PurchasingPages/checkoutCompletePage.spec"
import { CheckoutPage2 } from "../pom/PurchasingPages/checkoutPage2.spec"
import { CartPage } from "../pom/PurchasingPages/cartPage.spec"
import { ProductPage } from "../pom/productsPage.spec"
test.describe("Checkout functionality", () => {
    test.beforeEach(async ({ page }) => {
        await loginToLab(page)
    })
    test('Positive testing -> Buy a Sauce Labs backpack', async ({ page }) => {
        const productsPage = new ProductPage(page)
        const cartPage = new CartPage(page)
        const checkoutPage = new CheckoutPage(page)
        const checkoutPage2 = new CheckoutPage2(page)
        const checkoutCompletePage = new CheckoutCompletePage(page)
        await test.step("Open 'Sauce Labs Backpack' page", async () => {
            await productsPage.sauceLabsBackpack.click()
            await expect(page).toHaveURL(productsPage.sauceLabsBackpackUrl)
        })
        await test.step("Add 'Sauce Labs Backpack' to the cart", async () => {
            await productsPage.addToCartButton.click()
            await expect(productsPage.shoppingCartBadge).toHaveText('1')
        })
        await test.step('Click on the cart icon', async () => {
            await productsPage.shoppingCartLink.click()
            await expect(cartPage.title).toHaveText('Your Cart')
            await expect(page).toHaveURL(cartPage.cartPageUrl)
        })
        await test.step('Verify that the “Sauce Labs Backpack” is listed with a quantity of 1', async () => {
            await expect(cartPage.itemQuantity.first()).toHaveText("1")
        })
        await test.step('5. Click on “Checkout” button', async () => {
            await cartPage.checkoutButton.click()
        })
        await test.step("Enter a valid first name, last name and postcode", async () => {
            await checkoutPage.fillCheckoutInformation()
        })
        await test.step('Click on the "Continue" button', async () => {
            await checkoutPage.continueButton.click()
        })
        await test.step('Verify the product name, payment information, shipping information, and total price are correct.', async () => {
            await expect(checkoutPage2.inventoryItemNameInfo.first()).toHaveText('Sauce Labs Backpack')
            await expect(checkoutPage2.shippingInfo).toHaveText('Free Pony Express Delivery!')
            await expect(checkoutPage2.itemPriceInfo).toHaveText('Item total: $29.99')
        })
        await test.step('Click on “Finish” button', async () => {
            await checkoutPage2.finishButton.click()
        })
        await test.step("'Thank you for your order!” message should be visible", async () => {
            await expect(checkoutCompletePage.completeHeader).toHaveText(checkoutCompletePage.completeHeaderMessage)
        })
        await test.step("The Approval checkmark image should be visible", async () => {
            await expect(checkoutCompletePage.approvalCheckImg).toBeVisible()
        })
        await test.step("The “Back Home” button is visible and clickable.", async () => {
            await expect(checkoutCompletePage.backHomeButton).toBeEnabled()
        })
    })
    test("Negative testing -> Buy a product without enter a data into checkout information", async ({ page }) => {
        const productsPage = new ProductPage(page)
        const cartPage = new CartPage(page)
        const checkoutPage = new CheckoutPage(page)
        const checkoutPage2 = new CheckoutPage2(page)
        const checkoutCompletePage = new CheckoutCompletePage(page);
        await test.step("Open 'Sauce Labs Backpack' page", async () => {
            await productsPage.sauceLabsBackpack.click()
            await expect(page).toHaveURL(productsPage.sauceLabsBackpackUrl)
        })
        await test.step("Add 'Sauce Labs Backpack' to the cart", async () => {
            await productsPage.addToCartButton.click()
            await expect(productsPage.shoppingCartBadge).toHaveText('1')
        })
        await test.step('Click on the cart icon', async () => {
            await productsPage.shoppingCartLink.click()
            await expect(cartPage.title).toHaveText('Your Cart')
            await expect(page).toHaveURL(cartPage.cartPageUrl)
        })
        await test.step('Verify that the “Sauce Labs Backpack” is listed with a quantity of 1', async () => {
            await expect(cartPage.itemQuantity.first()).toHaveText("1")
        })
        await test.step('Click on “Checkout” button', async () => {
            await cartPage.checkoutButton.click()
        })
        await test.step('Click on the "Continue" button', async () => {
            await checkoutPage.continueButton.click()
        })
        await test.step("Verify that error message is displayed", async () => {
            await expect(checkoutPage.errorMessageLocator).toBeVisible()
            await expect(checkoutPage.errorMessageLocator).toHaveText("Error: First Name is required")
        })
    })
    test.skip("Negative testing -> Buy a product with enter empty spaces into checkout information", async ({ page }) => {
        const productsPage = new ProductPage(page)
        const cartPage = new CartPage(page)
        const checkoutPage = new CheckoutPage(page)
        const checkoutPage2 = new CheckoutPage2(page)
        const checkoutCompletePage = new CheckoutCompletePage(page)
        await test.step("Open 'Sauce Labs Backpack' page", async () => {
            await productsPage.sauceLabsBackpack.click()
            await expect(page).toHaveURL(productsPage.sauceLabsBackpackUrl)
        })
        await test.step("Add 'Sauce Labs Backpack' to the cart", async () => {
            await productsPage.addToCartButton.click()
            await expect(productsPage.shoppingCartBadge).toHaveText('1')
        })
        await test.step('Click on the cart icon', async () => {
            await productsPage.shoppingCartLink.click()
            await expect(cartPage.title).toHaveText('Your Cart')
            await expect(page).toHaveURL(cartPage.cartPageUrl)
        })
        await test.step('Verify that the “Sauce Labs Backpack” is listed with a quantity of 1', async () => {
            await expect(cartPage.itemQuantity.first()).toHaveText("1")
        })
        await test.step('Click on “Checkout” button', async () => {
            await cartPage.checkoutButton.click()
        })
        await test.step("Enter a valid first name, last name and postcode", async () => {
            await checkoutPage.fillWithEmptySpaces()
        })
        await test.step('Click on the "Continue" button', async () => {
            await checkoutPage.continueButton.click()
        })
        await test.step("Verify that error message is displayed", async () => {
            await expect(checkoutPage.errorMessageLocator).toBeVisible()
            await expect(checkoutPage.errorMessageLocator).toHaveText("Error: First Name is required")
        })
    })
})