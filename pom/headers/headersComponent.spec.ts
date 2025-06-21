import { expect, type Locator, type Page } from '@playwright/test';


export class HeaderComponent {
    readonly page: Page
    readonly title: Locator
    readonly shoppingCartBadge: Locator
    readonly shoppingCartLink: Locator
    readonly sightBarMenuButton: Locator
    readonly sightBarMenu: Locator
    readonly sightBarMenuLogoutButton: Locator
    constructor(page: Page) {
        this.page = page
        this.title = page.locator('[data-test="title"]')
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]')
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]')
        this.sightBarMenuButton = page.locator("#react-burger-menu-btn")
        this.sightBarMenu = page.locator('.bm-menu')
        this.sightBarMenuLogoutButton = page.locator('#logout_sidebar_link')

    }
}