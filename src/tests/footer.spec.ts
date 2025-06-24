import { test, expect } from "@playwright/test"
import { loginToLab } from './../utils/loginTo';
import { HeaderComponent } from '../pom/headers/headersComponent';
import { ProductPage } from "../pom/productsPage";
test.describe('Footer links', () => {
    test.beforeEach(async ({ page }) => {
        await loginToLab(page)
    });
    [
        { socialMedia: "LinkedIn", link: 'https://www.linkedin.com/company/sauce-labs/', title: 'Sauce Labs | LinkedIn', locator: '[data-test="social-linkedin"]' },
        { socialMedia: "Twitter | X", link: 'https://x.com/saucelabs', title: 'Sauce Labs (@saucelabs) / X', locator: '[data-test="social-twitter"]' },
        { socialMedia: "Facebook", link: 'https://www.facebook.com/saucelabs', title: 'Sauce Labs | Facebook', locator: '[data-test="social-facebook"]' },
    ].forEach(({ socialMedia, link, title, locator }) => {
        test(`Verify that ${socialMedia} link in footer section redirects to the "Sauce Labs" LinkedIn page correctly`, async ({ page, context }) => {
            const headerComponent = new HeaderComponent(page)
            const productPage = new ProductPage(page)
            await test.step('User on the products page', async () => {
                await expect(page).toHaveURL(productPage.productUrl)
                await expect(headerComponent.title).toHaveText('Products')
            })
            await test.step(`Click on the ${socialMedia} link image`, async () => {
                const [newPage] = await Promise.all([
                    context.waitForEvent('page'),
                    page.locator(locator).click(),
                ]); // Verify that new opened page is main page right now
                await newPage.waitForLoadState();
                await expect(newPage).toHaveURL(link)
                await expect(newPage).toHaveTitle(title)
            })
        })
    })


})