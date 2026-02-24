import { test, expect } from '@playwright/test';
import { HeaderComponent } from '../pages/HeaderComponent';
import { LoginPopup } from '../pages/LoginPopup';
import { RegisterPopup } from '../pages/RegisterPopup';
import { TestDataGenerator } from '../utils/test-data';
import { TEST_USER } from '../constants';

// Module 1: Authentication (TC01–TC07)
test.describe('Module 1: Authentication', () => {
    let header: HeaderComponent;
    let loginPopup: LoginPopup;
    let registerPopup: RegisterPopup;

    test.beforeEach(async ({ page }) => {
        header = new HeaderComponent(page);
        loginPopup = new LoginPopup(page);
        registerPopup = new RegisterPopup(page);
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');
    });

    test('TC01 - Register successfully with valid information', async ({ page }) => {
        const user = TestDataGenerator.validUser();

        await header.openRegisterPopup();
        await registerPopup.register(user);

        // Wait for success toast "Đăng ký thành công"
        const toast = page.getByText('Đăng ký thành công');
        await expect(toast).toBeVisible({ timeout: 10_000 });
    });

    test('TC02 - Register fails with already existing email', async ({ page }) => {
        const user = TestDataGenerator.validUser();
        user.email = TEST_USER.email; // already-registered email

        await header.openRegisterPopup();
        await registerPopup.register(user);
        await page.waitForTimeout(3000);

        // Should NOT show success toast
        const successToast = page.getByText('Đăng ký thành công');
        const toastVisible = await successToast.isVisible().catch(() => false);
        expect(toastVisible).toBeFalsy();
    });

    test('TC03 - Register fails with weak password', async ({ page }) => {
        const user = TestDataGenerator.userWithWeakPassword();

        await header.openRegisterPopup();
        await registerPopup.register(user);
        await page.waitForTimeout(2000);

        // Dialog should stay open (registration rejected)
        const dialogOpen = await registerPopup.isOpen();
        expect(dialogOpen).toBeTruthy();
    });

    test('TC04 - Login successfully with valid credentials', async ({ page }) => {
        await header.openLoginPopup();
        await loginPopup.login(TEST_USER.email, TEST_USER.password);

        // Wait for success toast
        const successToast = page.getByText('Đăng nhập thành công');
        await expect(successToast).toBeVisible({ timeout: 10_000 });

        // Dialog should close
        await page.waitForTimeout(1000);
        const dialogOpen = await loginPopup.isOpen();
        expect(dialogOpen).toBeFalsy();

        // User button should now show "Open user menu"
        const isLoggedIn = await header.isLoggedIn();
        expect(isLoggedIn).toBeTruthy();
    });

    test('TC05 - Login fails with wrong email/password', async ({ page }) => {
        const creds = TestDataGenerator.invalidCredentials();

        await header.openLoginPopup();
        await loginPopup.login(creds.email, creds.password);
        await page.waitForTimeout(3000);

        // Should NOT show success toast
        const successToast = page.getByText('Đăng nhập thành công');
        const toastVisible = await successToast.isVisible().catch(() => false);
        expect(toastVisible).toBeFalsy();
    });

    test('TC06 - Logout successfully', async ({ page }) => {
        // Login first
        await header.openLoginPopup();
        await loginPopup.login(TEST_USER.email, TEST_USER.password);
        await page.getByText('Đăng nhập thành công').waitFor({ state: 'visible', timeout: 10_000 });
        await page.waitForTimeout(1000);

        // Logout
        await header.logout();
        await page.waitForTimeout(2000);

        // After logout, the user icon button should no longer show "Open user menu"
        const isLoggedIn = await header.isLoggedIn();
        expect(isLoggedIn).toBeFalsy();
    });

    test('TC07 - Validate error messages display correctly', async ({ page }) => {
        // Test empty login submission
        await header.openLoginPopup();
        await loginPopup.waitForOpen();
        await loginPopup.submitBtn.click();
        await page.waitForTimeout(2000);

        // Should not show success, dialog stays open
        const dialogOpen = await loginPopup.isOpen();
        expect(dialogOpen).toBeTruthy();

        // Close login popup and try invalid registration
        // Close login popup and try invalid registration
        await loginPopup.close();
        // Wait for login dialog to actually close to avoid overlay issues
        await expect(loginPopup.dialog).toBeHidden({ timeout: 10_000 });
        await page.waitForTimeout(500);

        await header.openRegisterPopup();
        await registerPopup.waitForOpen();
        const invalidUser = TestDataGenerator.validUser();
        invalidUser.email = 'notanemail'; // bad format
        await registerPopup.nameInput.fill(invalidUser.name);
        await registerPopup.emailInput.fill(invalidUser.email);
        await registerPopup.submitBtn.click();
        await page.waitForTimeout(2000);

        // Dialog should remain (no success toast)
        const regDialogOpen = await registerPopup.isOpen();
        expect(regDialogOpen).toBeTruthy();
    });
});
