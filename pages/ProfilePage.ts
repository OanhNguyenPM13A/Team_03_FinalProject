import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface ProfileInfo {
    name: string;
    email: string;
    phone: string;
    birthday: string;
    gender: string;
}

/**
 * User Profile page at /info-user.
 *
 * View mode:  displays user info with "Chỉnh sửa hồ sơ" button.
 * Edit mode:  opens an ant-modal with form fields.
 */
export class ProfilePage extends BasePage {
    /* ── View-mode locators ── */
    readonly profileHeading: Locator;
    readonly userGreeting: Locator;
    readonly editProfileBtn: Locator;
    readonly updateAvatarBtn: Locator;
    readonly bookingHeading: Locator;

    /* ── Edit-modal locators ── */
    readonly editModal: Locator;
    readonly emailInput: Locator;
    readonly nameInput: Locator;
    readonly phoneInput: Locator;
    readonly birthdayInput: Locator;
    readonly genderSelect: Locator;
    readonly submitBtn: Locator;
    readonly closeModalBtn: Locator;

    /* ── Other ── */
    readonly avatarUploadInput: Locator;
    readonly notification: Locator;

    constructor(page: Page) {
        super(page);

        this.profileHeading = page.locator('p').filter({ hasText: 'Thông tin người dùng' });
        this.userGreeting = page.locator('p').filter({ hasText: /Xin chào, tôi là/ });
        this.editProfileBtn = page.getByRole('button', { name: 'Chỉnh sửa hồ sơ' });
        this.updateAvatarBtn = page.getByRole('button', { name: 'Cập nhật ảnh' });
        this.bookingHeading = page.getByRole('heading', { name: 'Phòng đã thuê' });

        this.editModal = page.getByRole('dialog', { name: 'Chỉnh sửa hồ sơ' });
        this.emailInput = this.editModal.locator('#email');
        this.nameInput = this.editModal.locator('#name');
        this.phoneInput = this.editModal.locator('#phone');
        this.birthdayInput = this.editModal.locator('#birthday');
        this.genderSelect = this.editModal.locator('#gender');
        this.submitBtn = this.editModal.getByRole('button', { name: 'Cập nhật' });
        this.closeModalBtn = this.editModal.getByRole('button', { name: 'Close' });

        this.avatarUploadInput = page.locator('input[type="file"]');
        this.notification = page.locator(
            '.ant-message-notice-content, .ant-notification-notice-message, .swal2-popup',
        );
    }

    async goto(): Promise<void> {
        await this.navigateTo('/info-user');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async isProfilePageLoaded(): Promise<boolean> {
        try {
            await this.profileHeading.waitFor({ state: 'visible', timeout: 10_000 });
            return true;
        } catch {
            return false;
        }
    }

    async getDisplayedUserName(): Promise<string> {
        try {
            const text = (await this.userGreeting.textContent()) ?? '';
            const match = text.match(/Xin chào, tôi là (.+)/);
            return match ? match[1].trim() : '';
        } catch {
            return '';
        }
    }

    async openEditModal(): Promise<void> {
        await this.editProfileBtn.click();
        await this.editModal.waitFor({ state: 'visible', timeout: 10_000 });
    }

    async closeEditModal(): Promise<void> {
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(1000);
    }

    async getProfileInfo(): Promise<ProfileInfo> {
        return {
            email: await this.emailInput.inputValue(),
            name: await this.nameInput.inputValue(),
            phone: await this.phoneInput.inputValue(),
            birthday: await this.birthdayInput.inputValue(),
            gender: await this.getGenderValue(),
        };
    }

    private async getGenderValue(): Promise<string> {
        try {
            const container = this.editModal.locator('.ant-select').filter({
                has: this.genderSelect,
            });
            const text = await container.locator('.ant-select-selection-item').textContent();
            return text?.trim() ?? '';
        } catch {
            return '';
        }
    }

    async updateProfile(data: Partial<ProfileInfo>): Promise<void> {
        if (data.name !== undefined) {
            await this.nameInput.clear();
            await this.nameInput.fill(data.name);
        }
        if (data.email !== undefined) {
            await this.emailInput.clear();
            await this.emailInput.fill(data.email);
        }
        if (data.phone !== undefined) {
            await this.phoneInput.clear();
            await this.phoneInput.fill(data.phone);
        }
        if (data.birthday !== undefined) {
            await this.birthdayInput.clear();
            await this.birthdayInput.fill(data.birthday);
        }
        if (data.gender !== undefined) {
            await this.selectGender(data.gender);
        }

        await this.submitBtn.click();
    }

    private async selectGender(gender: string): Promise<void> {
        const selectBox = this.editModal.locator('.ant-select').filter({
            has: this.genderSelect,
        });
        await selectBox.click();
        await this.page
            .locator('.ant-select-dropdown:visible')
            .getByText(gender, { exact: true })
            .click();
    }

    async uploadAvatar(filePath: string): Promise<void> {
        await this.updateAvatarBtn.click();

        const avatarDialog = this.page.getByRole('dialog').filter({
            has: this.page.getByRole('heading', { name: 'Thay đổi ảnh đại diện' }),
        });
        await avatarDialog.waitFor({ state: 'visible', timeout: 5_000 });

        const chooseFileBtn = avatarDialog.getByRole('button', { name: 'Choose File' });
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser', { timeout: 5_000 }),
            chooseFileBtn.click(),
        ]);
        await fileChooser.setFiles(filePath);
        await this.page.waitForTimeout(1000);

        const uploadBtn = avatarDialog.getByRole('button', { name: 'Upload Avatar' });
        await uploadBtn.click();
        await this.page.waitForTimeout(2000);
    }

    async getNotificationText(): Promise<string> {
        try {
            await this.notification.first().waitFor({ state: 'visible', timeout: 5_000 });
            return (await this.notification.first().textContent()) ?? '';
        } catch {
            return '';
        }
    }
}
