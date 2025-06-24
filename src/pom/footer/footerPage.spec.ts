import { expect, type Locator, type Page } from '@playwright/test';


export class FooterPage {
    readonly page: Page
    readonly title: Locator
    constructor(page: Page) {
        this.page = page
    }
}