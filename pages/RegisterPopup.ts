import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { TIMEOUTS } from '../constants';
import type { UserData } from '../utils/api-helper';

// Registration modal — heading "Đăng ký tài khoản"
export class RegisterPopup extends BasePage {
    readonly dialog: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly phoneInput: Locator;
    readonly birthdayInput: Locator;
    readonly genderCombobox: Locator;
    readonly submitBtn: Locator;

    constructor(page: Page) {
        super(page);
        // Scope to the container that has BOTH the Heading AND the Close button
        this.dialog = page.locator('div')
            .filter({ has: page.getByRole('heading', { name: 'Đăng ký tài khoản' }) })
            .filter({ has: page.getByRole('button', { name: 'Close' }) })
            .last();

        // Inputs scoped to this dialog
        this.nameInput = this.dialog.locator('#name');

        // Email has same placeholder as Name ("Điền tên vào đây..."), so we use nth(1)
        // getByLabel('Email') proved unreliable due to missing label associations in DOM.
        this.emailInput = this.dialog.getByPlaceholder('Điền tên vào đây...').nth(1);

        // Password has unique placeholder "Điền mật khẩu...."
        this.passwordInput = this.dialog.getByPlaceholder('Điền mật khẩu....');

        // Phone has unique placeholder "Điền số điện thoại...."
        this.phoneInput = this.dialog.getByPlaceholder('Điền số điện thoại....');

        this.birthdayInput = this.dialog.locator('#birthday');
        this.genderCombobox = this.dialog.locator('#gender');

        this.submitBtn = this.dialog.locator('button', { hasText: 'Đăng ký' });
    }

    async waitForOpen(): Promise<void> {
        await this.dialog.waitFor({ state: 'visible', timeout: TIMEOUTS.LONG });
    }

    async fillForm(user: UserData): Promise<void> {
        await this.waitForOpen();
        await this.nameInput.fill(user.name);
        await this.emailInput.fill(user.email);
        if (user.password) await this.passwordInput.fill(user.password);
        await this.phoneInput.fill(user.phone);
        if (user.birthday) {
            await this.birthdayInput.click();
            await this.birthdayInput.fill(user.birthday);
            await this.birthdayInput.press('Enter');
        }
        if (user.gender !== undefined) {
            // Force click to handle overlays
            await this.genderCombobox.click({ force: true });
            await this.page.waitForTimeout(300);
            const label = user.gender ? 'Nam' : 'Nữ';
            await this.page.getByText(label, { exact: true }).click();
        }
    }

    async register(user: UserData): Promise<void> {
        await this.fillForm(user);
        // Ensure button is visible before clicking
        await this.submitBtn.scrollIntoViewIfNeeded();
        await this.submitBtn.click();
    }

    async close(): Promise<void> {
        // Close button scoped to the dialog container
        await this.dialog.getByRole('button', { name: 'Close' }).click();
    }

    async isOpen(): Promise<boolean> {
        return this.dialog.isVisible();
    }
}
