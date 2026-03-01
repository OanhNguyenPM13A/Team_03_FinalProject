import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { TIMEOUTS } from '../constants';

export class HeaderComponent extends BasePage {
    readonly loginDropdownBtn: Locator;
    readonly registerDropdownBtn: Locator;
    readonly signOutBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.loginDropdownBtn = page.getByRole('button', { name: 'Đăng nhập' });
        this.registerDropdownBtn = page.getByRole('button', { name: 'Đăng ký' });
        this.signOutBtn = page.getByRole('button', { name: 'Sign out' });
    }

    private getUserIconBtn(): Locator {
        return this.page.locator('nav button').filter({ has: this.page.locator('img') }).first();
    }

    async openUserDropdown(): Promise<void> {
        const btn = this.getUserIconBtn();
        await btn.waitFor({ state: 'visible', timeout: TIMEOUTS.LONG });
        await btn.click();
        await this.loginDropdownBtn.or(this.signOutBtn).first().waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
    }

    async openLoginPopup(): Promise<void> {
        await this.openUserDropdown();
        await this.loginDropdownBtn.click();
    }

    async openRegisterPopup(): Promise<void> {
        await this.openUserDropdown();
        await this.registerDropdownBtn.click();
    }

    async isLoggedIn(): Promise<boolean> {
        const btn = this.getUserIconBtn();
        const text = await btn.textContent() ?? '';
        return text.includes('Open user menu');
    }

    async logout(): Promise<void> {
        await this.openUserDropdown();
        await this.signOutBtn.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
        await this.signOutBtn.click();
    }
}
