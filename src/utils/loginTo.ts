import { expect } from '@playwright/test';
import { LoginPage } from '../pom/login/loginPage';
export async function loginToLab(page: any) {
    await page.goto('https://www.saucedemo.com/')
    const loginPage = new LoginPage(page)
    await loginPage.fillUsername('standard_user')
    await loginPage.fillPassword('secret_sauce')
    await loginPage.loginButton.click()
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    await expect(loginPage.productsHeader).toHaveText("Products")
}