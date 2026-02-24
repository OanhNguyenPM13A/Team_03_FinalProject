import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

// Header nav bar — user icon, auth dropdown, logged-in state
export class HeaderComponent extends BasePage {
    // Dropdown items (visible after clicking user icon)
    readonly loginDropdownBtn: Locator;
    readonly registerDropdownBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.loginDropdownBtn = page.getByRole('button', { name: 'Đăng nhập' });
        this.registerDropdownBtn = page.getByRole('button', { name: 'Đăng ký' });
    }

    // The user icon changes depending on login state.
    // Before login: nameless button with just an img
    // After login: "Open user menu <name>"
    private getUserIconBtn(): Locator {
        return this.page.locator('nav button').filter({ has: this.page.locator('img') }).first();
    }

    async openUserDropdown(): Promise<void> {
        const btn = this.getUserIconBtn();
        await btn.waitFor({ state: 'visible', timeout: 10_000 });
        await btn.click();
        await this.page.waitForTimeout(500);
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
        await this.page.getByRole('button', { name: 'Sign out' }).click();
    }
}
