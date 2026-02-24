import { type Page, type Locator } from '@playwright/test';
import { TIMEOUTS } from '../constants';

/**
 * Base class for all Page Objects.
 * Provides common utility methods for page interaction.
 */
export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /** Navigate to a path relative to baseURL. */
    async navigateTo(path: string): Promise<void> {
        await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    }

    /** Wait for element to be visible with a custom timeout. */
    async waitForVisible(locator: Locator, timeout = TIMEOUTS.MEDIUM): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout });
    }

    /** Wait for element to be hidden. */
    async waitForHidden(locator: Locator, timeout = TIMEOUTS.MEDIUM): Promise<void> {
        await locator.waitFor({ state: 'hidden', timeout });
    }

    /** Get toast/notification message text if any. */
    async getToastMessage(): Promise<string> {
        const toast = this.page.locator('.ant-message-notice-content, .ant-notification-notice-message, .swal2-popup');
        try {
            await toast.first().waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
            return (await toast.first().textContent()) ?? '';
        } catch {
            return '';
        }
    }

    /** Wait for any loading spinners to disappear. */
    async waitForLoadingDone(): Promise<void> {
        const spinner = this.page.locator('.ant-spin-spinning, .ant-skeleton');
        try {
            await spinner.first().waitFor({ state: 'hidden', timeout: TIMEOUTS.MEDIUM });
        } catch {
            // No spinner found, that's fine
        }
    }

    /** Take a screenshot and save to the screenshots directory. */
    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({
            path: `screenshots/${name}-${Date.now()}.png`,
            fullPage: false,
        });
    }

    /** Get current page URL. */
    getCurrentUrl(): string {
        return this.page.url();
    }

    /** Wait a fixed amount of time (use sparingly). */
    async wait(ms: number): Promise<void> {
        await this.page.waitForTimeout(ms);
    }
}
