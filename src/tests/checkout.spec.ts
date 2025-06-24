import { test, expect } from '@playwright/test';
import { loginToLab } from './../utils/loginTo'
import { CheckoutPage } from '../pom/PurchasingPages/checkoutPage';
import { CheckoutCompletePage } from "../pom/PurchasingPages/checkoutCompletePage"
import { CheckoutPage2 } from "../pom/PurchasingPages/checkoutPage2"
import { CartPage } from "../pom/PurchasingPages/cartPage"
import { ProductPage } from "../pom/productsPage"
import { HeaderComponent } from '../pom/headers/headersComponent';
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
        const headerComponent = new HeaderComponent(page)
        await test.step("Open 'Sauce Labs Backpack' page", async () => {
            await productsPage.sauceLabsBackpack.click()
            await expect(page).toHaveURL(productsPage.sauceLabsBackpackUrl)
        })
        await test.step("Add 'Sauce Labs Backpack' to the cart", async () => {
            await productsPage.addToCartButton.click()
            await expect(headerComponent.shoppingCartBadge).toHaveText('1')
        })
        await test.step('Click on the cart icon', async () => {
            await headerComponent.shoppingCartLink.click()
            await expect(headerComponent.title).toHaveText('Your Cart')
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
        const headerComponent = new HeaderComponent(page)

        await test.step("Open 'Sauce Labs Backpack' page", async () => {
            await productsPage.sauceLabsBackpack.click()
            await expect(page).toHaveURL(productsPage.sauceLabsBackpackUrl)
        })
        await test.step("Add 'Sauce Labs Backpack' to the cart", async () => {
            await productsPage.addToCartButton.click()
            await expect(headerComponent.shoppingCartBadge).toHaveText('1')
        })
        await test.step('Click on the cart icon', async () => {
            await headerComponent.shoppingCartLink.click()
            await expect(headerComponent.title).toHaveText('Your Cart')
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
        const headerComponent = new HeaderComponent(page)

        await test.step("Open 'Sauce Labs Backpack' page", async () => {
            await productsPage.sauceLabsBackpack.click()
            await expect(page).toHaveURL(productsPage.sauceLabsBackpackUrl)
        })
        await test.step("Add 'Sauce Labs Backpack' to the cart", async () => {
            await productsPage.addToCartButton.click()
            await expect(headerComponent.shoppingCartBadge).toHaveText('1')
        })
        await test.step('Click on the cart icon', async () => {
            await headerComponent.shoppingCartLink.click()
            await expect(headerComponent.title).toHaveText('Your Cart')
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
    test.skip("Negative testing -> Verify the behavior of checkout functionality without adding any item to the cart", async ({ page }) => {
        const cartPage = new CartPage(page)
        const headerComponent = new HeaderComponent(page)
        const productPage = new ProductPage(page)
        await test.step("Navigate user to the product page", async () => {
            await expect(page).toHaveURL(productPage.productUrl)
            await expect(headerComponent.title).toHaveText("Products")
        })
        await test.step('Click on cart icon at the top of the right corner', async () => {
            await headerComponent.shoppingCartLink.click()
        })
        await test.step('Verify that user is redirected to the cart page', async () => {
            await expect(page).toHaveURL(cartPage.cartPageUrl)
            await expect(headerComponent.title).toHaveText("Your Cart")
        })
        await test.step('Verify that product section at the cart page is empty', async () => {
            await expect(cartPage.inventoryItem).not.toBeVisible()
        })
        await test.step('Click on the “Checkout” green button', async () => {
            await cartPage.checkoutButton.click()
        })
        await test.step('The error message “You didn’t add any item to the cart” should be displayed', async () => {
            // We should have locator for error at the cart page and then verify that after clicking on checkout button error message is displayed
        })
        await test.step('The user remains on the Cart page', async () => {
            // Check that user wasn't redirected to the next checkout page
        })
    });

    [
        { alphabet: "Cilirica", firstName: 'Иван', lastName: "Петров", zipcode: "51000" },
        { alphabet: "Arabic", firstName: 'عبد الله', lastName: "الزهراني", zipcode: "60000" },
    ].forEach(({ alphabet, firstName, lastName, zipcode }) => {
        test(`Verify that user can enter data in ${alphabet} in checkout information page`, async ({ page }) => {
            const productsPage = new ProductPage(page)
            const cartPage = new CartPage(page)
            const checkoutPage = new CheckoutPage(page)
            const checkoutPage2 = new CheckoutPage2(page)
            const checkoutCompletePage = new CheckoutCompletePage(page)
            const headerComponent = new HeaderComponent(page)

            await test.step("User navigates to the products item page", async () => {
                await expect(page).toHaveURL(productsPage.productUrl)
                await expect(headerComponent.title).toHaveText("Products")
            })
            await test.step("Click on the “Add to cart” button for random product | Sauce Labs Bike Light", async () => {
                await productsPage.bikeLightAddToCart.click()

            })
            await test.step('Verify that cart icon value at the right top corner increased by 1', async () => {
                await expect(headerComponent.shoppingCartBadge).toHaveText('1')
            })
            await test.step('Click on the cart icon value at the right top corner', async () => {
                await headerComponent.shoppingCartLink.click()

            })
            await test.step('Verify that user is redirected to the cart page', async () => {
                await expect(headerComponent.title).toHaveText('Your Cart')
                await expect(page).toHaveURL(cartPage.cartPageUrl)
            })
            await test.step('Verify that pre-selected product is displayed at the cart page', async () => {
                await expect(cartPage.itemQuantity.first()).toHaveText("1")
                await expect(cartPage.inventoryItemName).toHaveText('Sauce Labs Bike Light')
            })
            await test.step('Click on the “Checkout” button', async () => {
                await cartPage.checkoutButton.click()
            })
            await test.step('Verify that user is redirected to the “Checkout: Your Information” page', async () => {
                await expect(page).toHaveURL(checkoutPage.checkoutUrl)
                await expect(headerComponent.title).toHaveText('Checkout: Your Information')
            })
            await test.step("Enter a valid first name, last name and postcode", async () => {
                await checkoutPage.fillCheckoutInformationManual(firstName, lastName, zipcode)
            })
            await test.step('Click on the "Continue" button', async () => {
                await checkoutPage.continueButton.click()
            })
            await test.step('Verify that user is redirected to the “Checkout: Overview” page', async () => {
                await expect(page).toHaveURL(checkoutPage2.checkout2Url)
                await expect(headerComponent.title).toHaveText('Checkout: Overview')
            })
            await test.step('Verify that pre-selected product info correspond information in the overview page', async () => {
                await expect(checkoutPage2.inventoryItemNameInfo.first()).toHaveText('Sauce Labs Bike Light')
                await expect(checkoutPage2.shippingInfo).toHaveText('Free Pony Express Delivery!')
                await expect(checkoutPage2.itemPriceInfo).toHaveText('Item total: $9.99')
            })
            await test.step('Click on the “Finish” button', async () => {
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
    })
})