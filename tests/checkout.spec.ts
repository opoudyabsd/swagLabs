import { test, expect } from '@playwright/test';
import { loginToLab } from './../utils/loginTo'
import { CheckoutPage } from '../pom/checkoutPage.spec';

test.describe("Checkout functionality", () => {
    test.beforeEach(async ({ page }) => {
        await loginToLab(page)
    })
    test('Positive testing -> Buy a Sauce Labs backpack', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page)
        await test.step("Open 'Sauce Labs Backpack' page", async () => {
            await checkoutPage.sauceLabsBackpack.click()
            await expect(page).toHaveURL(checkoutPage.sauceLabsBackpackUrl)
        })
        await test.step("Add 'Sauce Labs Backpack' to the cart", async () => {
            await checkoutPage.addToCartButton.click()
            await expect(checkoutPage.shoppingCartBadge).toHaveText('1')
        })
        await test.step('Click on the cart icon', async () => {
            await checkoutPage.shoppingCartLink.click()
            await expect(checkoutPage.title).toHaveText('Your Cart')
            await expect(page).toHaveURL(checkoutPage.cartPageUrl)
        })
        await test.step('Verify that the “Sauce Labs Backpack” is listed with a quantity of 1', async () => {
            await expect(checkoutPage.itemQuantity.first()).toHaveText("1")
        })
        await test.step('5. Click on “Checkout” button', async () => {
            await checkoutPage.checkoutButton.click()
        })
        await test.step("Enter a valid first name, last name and postcode", async () => {
            await checkoutPage.fillCheckoutInformation()
        })
        await test.step('Click on the "Continue" button', async () => {
            await checkoutPage.continueButton.click()
        })
        await test.step('Verify the product name, payment information, shipping information, and total price are correct.', async () => {
            await expect(checkoutPage.inventoryItemNameInfo.first()).toHaveText('Sauce Labs Backpack')
            await expect(checkoutPage.shippingInfo).toHaveText('Free Pony Express Delivery!')
            await expect(checkoutPage.itemPriceInfo).toHaveText('Item total: $29.99')
        })
        await test.step('Click on “Finish” button', async () => {
            await checkoutPage.finishButton.click()
        })
        await test.step("'Thank you for your order!” message should be visible", async () => {
            await expect(checkoutPage.completeHeader).toHaveText(checkoutPage.completeHeaderMessage)
        })
        await test.step("The Approval checkmark image should be visible", async () => {
            await expect(checkoutPage.approvalCheckImg).toBeVisible()
        })
        await test.step("The “Back Home” button is visible and clickable.", async () => {
            await expect(checkoutPage.backHomeButton).toBeEnabled()
        })
    })
})