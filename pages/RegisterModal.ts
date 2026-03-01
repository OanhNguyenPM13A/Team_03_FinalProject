import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { TIMEOUTS } from '../constants';

export class RegisterModal extends BasePage {
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly phoneInput: Locator;
    readonly birthdayInput: Locator;
    readonly genderSelect: Locator;
    readonly submitButton: Locator;
    readonly closeButton: Locator;
    readonly modal: Locator;

    constructor(page: Page) {
        super(page);
        this.modal = page.locator('.ant-modal-content');

        this.nameInput = page.locator('input#name').or(page.getByRole('textbox', { name: 'name' }));
        this.emailInput = page.locator('input#email').or(page.getByRole('textbox', { name: 'email' }));
        this.passwordInput = page.locator('input#password').or(page.getByRole('textbox', { name: 'password' }));
        this.phoneInput = page.locator('input#phone').or(page.getByRole('textbox', { name: 'phone' }));
        this.birthdayInput = page.locator('input#birthday').or(page.getByRole('textbox', { name: 'birthday' }));
        this.genderSelect = page.locator("div.ant-select[name='gender']");
        this.submitButton = page.getByRole('button', { name: 'Đăng ký' });
        this.closeButton = page.getByRole('button', { name: 'Close' });
    }

    async waitForModal(timeout: number = TIMEOUTS.LONG): Promise<void> {
        await this.modal.waitFor({ state: 'visible', timeout });
    }

    async fillRegisterData(
        name?: string,
        email?: string,
        password?: string,
        phone?: string,
    ): Promise<void> {
        if (name) await this.nameInput.fill(name);
        if (email) await this.emailInput.fill(email);
        if (password) await this.passwordInput.fill(password);
        if (phone) await this.phoneInput.fill(phone);
    }

    async selectBirthday(date: string): Promise<void> {
        await this.birthdayInput.click();
        await this.page.keyboard.type(date);
        await this.page.keyboard.press('Enter');
    }

    async selectGender(gender: string): Promise<void> {
        await this.genderSelect.click();
        const genderOption = this.page.locator('.ant-select-item');
        await genderOption.first().waitFor({ state: 'visible', timeout: TIMEOUTS.SHORT });

        if (gender === 'Nam') {
            await genderOption.nth(0).click();
        } else {
            await genderOption.nth(1).click();
        }
    }
}
