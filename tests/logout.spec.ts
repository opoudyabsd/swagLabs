import { test, expect } from '@playwright/test';
import { loginToLab } from './../utils/loginTo'
import { ProductPage } from "../pom/productsPage.spec"
import { LoginPage } from '../pom/login/loginPage.spec';

test.describe('Logout functionality', () => {
    test.beforeEach(async ({ page }) => {
        await loginToLab(page)
    });
    test('Verify that user can logout from the account', async ({ page }) => {
        const productPage = new ProductPage(page)
        const loginPage = new LoginPage(page)
        await test.step('User is on the products page', async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
            await expect(productPage.title).toHaveText("Products")
        })
        await test.step('User clicks on the sight bar menu button', async () => {
            await productPage.sightBarMenuButton.click()
        })
        await test.step('Verify that sight bar menu is visible', async () => {
            await expect(productPage.sightBarMenu).toBeVisible()
        })
        await test.step('Click on the “Logout” button', async () => {
            await productPage.sightBarMenuLogoutButton.click()
        })
        await test.step('User should be redirected to login page', async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/')
        })
        await test.step('User should be logged out', async () => {
            await expect(loginPage.loginSection).toBeVisible()
        })
    })
})