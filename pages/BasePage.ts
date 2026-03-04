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

    async navigateTo(path: string): Promise<void> {
        await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    }

    async waitForVisible(locator: Locator, timeout = TIMEOUTS.MEDIUM): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout });
    }

    async waitForHidden(locator: Locator, timeout = TIMEOUTS.MEDIUM): Promise<void> {
        await locator.waitFor({ state: 'hidden', timeout });
    }

    async getToastMessage(): Promise<string> {
        const toast = this.page.locator('.ant-message-notice-content, .ant-notification-notice-message, .swal2-popup');
        try {
            await toast.first().waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
            return (await toast.first().textContent()) ?? '';
        } catch {
            return '';
        }
    }

    async waitForLoadingDone(): Promise<void> {
        const spinner = this.page.locator('.ant-spin-spinning, .ant-skeleton');
        try {
            await spinner.first().waitFor({ state: 'hidden', timeout: TIMEOUTS.MEDIUM });
        } catch {
            // No spinner found
        }
    }

    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({
            path: `screenshots/${name}-${Date.now()}.png`,
            fullPage: false,
        });
    }

    getCurrentUrl(): string {
        return this.page.url();
    }

    async wait(ms: number): Promise<void> {
        await this.page.waitForTimeout(ms);
    }
}
