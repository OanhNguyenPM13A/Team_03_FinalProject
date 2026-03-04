import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { TIMEOUTS } from '../constants';

export class LoginPopup extends BasePage {
    readonly dialog: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitBtn: Locator;
    readonly closeBtn: Locator;

    constructor(page: Page) {
        super(page);
        // Scoped to the modal wrapper containing both the heading and close button
        this.dialog = page.locator('div')
            .filter({ has: page.getByRole('heading', { name: 'Đăng nhập' }) })
            .filter({ has: page.getByRole('button', { name: 'Close' }) })
            .last();

        this.emailInput = this.dialog.getByPlaceholder('Vui lòng nhập tài khoản');
        this.passwordInput = this.dialog.getByPlaceholder('Vui lòng nhập mật khẩu');
        this.submitBtn = this.dialog.locator('button', { hasText: 'Đăng nhập' });
        this.closeBtn = this.dialog.getByRole('button', { name: 'Close' });
    }

    async waitForOpen(): Promise<void> {
        await this.dialog.waitFor({ state: 'visible', timeout: TIMEOUTS.LONG });
    }

    async login(email: string, password: string): Promise<void> {
        await this.waitForOpen();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitBtn.click();
    }

    async close(): Promise<void> {
        await this.closeBtn.click();
    }

    async isOpen(): Promise<boolean> {
        return this.dialog.isVisible();
    }
}
