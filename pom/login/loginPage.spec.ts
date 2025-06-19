import { expect, type Locator, type Page } from '@playwright/test';
export class LoginPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly productsHeader: Locator;
    readonly errorLocator: Locator;
    readonly loginSection: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.locator('#user-name')
        this.passwordField = page.locator('#password')
        this.loginButton = page.getByRole('button', { name: /Login/i })
        this.productsHeader = page.locator('[data-test="title"]')
        this.errorLocator = page.locator('[data-test="error"]')
        this.loginSection = page.locator('.login_wrapper-inner')
    }
    async goto() {
        await this.page.goto("/")
    }
    async fillUsername(value: any) {
        await this.usernameField.fill(value)
    }
    async fillPassword(value: any) {
        await this.passwordField.fill(value)
    }

}