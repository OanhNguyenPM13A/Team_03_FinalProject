import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { TIMEOUTS } from '../constants';
import type { UserData } from '../utils/api-helper';

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
        this.dialog = page.locator('div')
            .filter({ has: page.getByRole('heading', { name: 'Đăng ký tài khoản' }) })
            .filter({ has: page.getByRole('button', { name: 'Close' }) })
            .last();

        this.nameInput = this.dialog.locator('#name');
        // nth(1) because email shares the same placeholder as name
        this.emailInput = this.dialog.getByPlaceholder('Điền tên vào đây...').nth(1);
        this.passwordInput = this.dialog.getByPlaceholder('Điền mật khẩu....');
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
            await this.genderCombobox.click({ force: true });
            await this.page.waitForTimeout(2000);
            const label = user.gender ? 'Nam' : 'Nữ';
            await this.page.getByText(label, { exact: true }).click();
        }
    }

    async register(user: UserData): Promise<void> {
        await this.fillForm(user);
        await this.page.waitForTimeout(2000);
        await this.submitBtn.scrollIntoViewIfNeeded();
        await this.submitBtn.click();
    }

    async close(): Promise<void> {
        await this.dialog.getByRole('button', { name: 'Close' }).click();
    }

    async isOpen(): Promise<boolean> {
        return this.dialog.isVisible();
    }
}
