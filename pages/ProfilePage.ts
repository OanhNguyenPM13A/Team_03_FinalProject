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
    /** Profile heading, e.g. "Thông tin người dùng test" */
    readonly profileHeading: Locator;
    /** User greeting, e.g. "Xin chào, tôi là test" */
    readonly userGreeting: Locator;
    /** "Chỉnh sửa hồ sơ" button (opens edit modal) */
    readonly editProfileBtn: Locator;
    /** "Cập nhật ảnh" button */
    readonly updateAvatarBtn: Locator;
    /** Booking section heading */
    readonly bookingHeading: Locator;

    /* ── Edit-modal locators ── */
    /** The ant-modal dialog that contains the edit form. */
    readonly editModal: Locator;
    /** Email input (#email) */
    readonly emailInput: Locator;
    /** Name input (#name / Họ tên) */
    readonly nameInput: Locator;
    /** Phone input (#phone / Số điện thoại) */
    readonly phoneInput: Locator;
    /** Birthday date-picker input (#birthday / Ngày sinh) */
    readonly birthdayInput: Locator;
    /** Gender ant-select (#gender / Giới tính) */
    readonly genderSelect: Locator;
    /** "Cập nhật" submit button inside modal */
    readonly submitBtn: Locator;
    /** Close (×) button on the edit modal */
    readonly closeModalBtn: Locator;

    /* ── Other ── */
    /** File input for avatar upload (hidden, set via setInputFiles). */
    readonly avatarUploadInput: Locator;
    /** Toast / notification container. */
    readonly notification: Locator;

    constructor(page: Page) {
        super(page);

        /* View mode */
        this.profileHeading = page.locator('p').filter({ hasText: 'Thông tin người dùng' });
        this.userGreeting = page.locator('p').filter({ hasText: /Xin chào, tôi là/ });
        this.editProfileBtn = page.getByRole('button', { name: 'Chỉnh sửa hồ sơ' });
        this.updateAvatarBtn = page.getByRole('button', { name: 'Cập nhật ảnh' });
        this.bookingHeading = page.getByRole('heading', { name: 'Phòng đã thuê' });

        /* Edit modal — the ant-modal renders as a dialog with title "Chỉnh sửa hồ sơ" */
        this.editModal = page.getByRole('dialog', { name: 'Chỉnh sửa hồ sơ' });
        this.emailInput = this.editModal.locator('#email');
        this.nameInput = this.editModal.locator('#name');
        this.phoneInput = this.editModal.locator('#phone');
        this.birthdayInput = this.editModal.locator('#birthday');
        this.genderSelect = this.editModal.locator('#gender');
        this.submitBtn = this.editModal.getByRole('button', { name: 'Cập nhật' });
        this.closeModalBtn = this.editModal.getByRole('button', { name: 'Close' });

        /* Other */
        this.avatarUploadInput = page.locator('input[type="file"]');
        this.notification = page.locator(
            '.ant-message-notice-content, .ant-notification-notice-message, .swal2-popup',
        );
    }

    /* ────────────────────────── Navigation ────────────────────────── */

    /** Navigate to the profile page. */
    async goto(): Promise<void> {
        await this.navigateTo('/info-user');
        await this.page.waitForLoadState('domcontentloaded');
    }

    /* ────────────────────────── View Mode ────────────────────────── */

    /** Verify the profile page loaded (heading is visible). */
    async isProfilePageLoaded(): Promise<boolean> {
        try {
            await this.profileHeading.waitFor({ state: 'visible', timeout: 10_000 });
            return true;
        } catch {
            return false;
        }
    }

    /** Get the displayed user name from the greeting line. */
    async getDisplayedUserName(): Promise<string> {
        try {
            const text = (await this.userGreeting.textContent()) ?? '';
            const match = text.match(/Xin chào, tôi là (.+)/);
            return match ? match[1].trim() : '';
        } catch {
            return '';
        }
    }

    /* ────────────────────────── Edit Modal ────────────────────────── */

    /** Open the edit-profile modal by clicking "Chỉnh sửa hồ sơ". */
    async openEditModal(): Promise<void> {
        await this.editProfileBtn.click();
        await this.editModal.waitFor({ state: 'visible', timeout: 10_000 });
    }

    /** Close the edit-profile modal. */
    async closeEditModal(): Promise<void> {
        // Use Escape key which reliably closes ant-design modals
        await this.page.keyboard.press('Escape');
        // Wait for modal close animation
        await this.page.waitForTimeout(1000);
    }

    /** Read all form field values from the edit modal. */
    async getProfileInfo(): Promise<ProfileInfo> {
        return {
            email: await this.emailInput.inputValue(),
            name: await this.nameInput.inputValue(),
            phone: await this.phoneInput.inputValue(),
            birthday: await this.birthdayInput.inputValue(),
            gender: await this.getGenderValue(),
        };
    }

    /** Get the current gender display text from the ant-select. */
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

    /** Update profile fields in the edit modal. Only fills non-empty values. */
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

    /** Select a gender option from the ant-select dropdown. */
    private async selectGender(gender: string): Promise<void> {
        // Click the ant-select to open the dropdown
        const selectBox = this.editModal.locator('.ant-select').filter({
            has: this.genderSelect,
        });
        await selectBox.click();
        // Click the matching option
        await this.page
            .locator('.ant-select-dropdown:visible')
            .getByText(gender, { exact: true })
            .click();
    }

    /* ────────────────────────── Avatar ────────────────────────── */

    /**
     * Upload an avatar image file.
     * "Cập nhật ảnh" opens a dialog "Thay đổi ảnh đại diện" with:
     *   - "Choose File" button (triggers file chooser)
     *   - "Upload Avatar" button (submits the upload)
     */
    async uploadAvatar(filePath: string): Promise<void> {
        // Click "Cập nhật ảnh" to open the avatar dialog
        await this.updateAvatarBtn.click();

        // Wait for the avatar dialog to appear
        const avatarDialog = this.page.getByRole('dialog').filter({
            has: this.page.getByRole('heading', { name: 'Thay đổi ảnh đại diện' }),
        });
        await avatarDialog.waitFor({ state: 'visible', timeout: 5_000 });

        // Click "Choose File" which triggers a file chooser
        const chooseFileBtn = avatarDialog.getByRole('button', { name: 'Choose File' });
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser', { timeout: 5_000 }),
            chooseFileBtn.click(),
        ]);
        await fileChooser.setFiles(filePath);
        await this.page.waitForTimeout(1000);

        // Click "Upload Avatar" to submit
        const uploadBtn = avatarDialog.getByRole('button', { name: 'Upload Avatar' });
        await uploadBtn.click();
        await this.page.waitForTimeout(2000);
    }

    /* ────────────────────────── Notifications ────────────────────────── */

    /** Get the first visible notification/toast text, or empty string. */
    async getNotificationText(): Promise<string> {
        try {
            await this.notification.first().waitFor({ state: 'visible', timeout: 5_000 });
            return (await this.notification.first().textContent()) ?? '';
        } catch {
            return '';
        }
    }
}
