import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/login/loginPage.spec';


test.describe('Login functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('Verify login functionality with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await test.step('Enter an already registered user name into username field', async () => {
            await loginPage.fillUsername('standard_user')
        })
        await test.step('Enter a valid password to the password field', async () => {
            await loginPage.fillPassword('secret_sauce')
        })
        await test.step('Click on login button', async () => {
            await loginPage.loginButton.click()
        })
        await test.step("Verify redirection to the inventory page", async () => {
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
            await expect(loginPage.productsHeader).toHaveText("Products")
        })
    })

    test("Verify login functionality with invalid credentials", async ({ page }) => {
        const loginPage = new LoginPage(page)
        await test.step('Enter an invalid user name into username field', async () => {
            await loginPage.fillUsername('yaperdolya')
        })
        await test.step('Enter an invalid password to the password field', async () => {
            await loginPage.fillPassword('passWorld')

        })
        await test.step('Click on login button', async () => {
            await loginPage.loginButton.click()
        })
        await test.step("Check if error message is displayed", async () => {
            await expect(loginPage.errorLocator).toHaveText('Epic sadface: Username and password do not match any user in this service')
        })
    })

    test("Verify login functionality with blocked account", async ({ page }) => {
        const loginPage = new LoginPage(page)

        await test.step('Enter an locked user name into username field', async () => {
            await loginPage.fillUsername('locked_out_user')

        })
        await test.step('Enter an valid password for locked account to the password field', async () => {
            await loginPage.fillPassword('secret_sauce')

        })
        await test.step('Click on login button', async () => {
            await loginPage.loginButton.click()
        })
        await test.step("Check if error message is displayed", async () => {
            await expect(loginPage.errorLocator).toHaveText('Epic sadface: Sorry, this user has been locked out.')
        })
    })

    test("Verify login functionality with empty username", async ({ page }) => {
        const loginPage = new LoginPage(page)

        await test.step('Enter an valid password for locked account to the password field', async () => {
            await loginPage.fillPassword('secret_sauce')
        })
        await test.step('Click on login button', async () => {
            await loginPage.loginButton.click()
        })
        await test.step("Check if error message is displayed", async () => {
            await expect(loginPage.errorLocator).toHaveText('Epic sadface: Username is required')
        })
    })

    test("Verify login functionality with empty password", async ({ page }) => {
        const loginPage = new LoginPage(page)

        await test.step('Enter a valid username into username field', async () => {
            await loginPage.fillUsername('standard_user')
        })
        await test.step('Click on login button', async () => {
            await loginPage.loginButton.click()
        })
        await test.step("Check if error message is displayed", async () => {
            await expect(loginPage.errorLocator).toHaveText('Epic sadface: Password is required')
        })
    })

    test("Verify login functionality with empty username and password", async ({ page }) => {
        const loginPage = new LoginPage(page)

        await test.step('Click on login button', async () => {
            await loginPage.loginButton.click()
        })
        await test.step("Check if error message is displayed", async () => {
            await expect(loginPage.errorLocator).toHaveText('Epic sadface: Username is required')
        })
    })
})