import { test, expect } from '@playwright/test';
import { HeaderComponent } from '../pages/HeaderComponent';
import { LoginPopup } from '../pages/LoginPopup';
import { RegisterPopup } from '../pages/RegisterPopup';
import { TestDataGenerator } from '../utils/test-data';
import { TEST_USER, TIMEOUTS } from '../constants';

test.describe.serial('Module 1: Authentication', () => {
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

        await expect(page.getByText('Đăng ký thành công')).toBeVisible({ timeout: 10_000 });
    });

    test('TC02 - Register fails with already existing email', async ({ page }) => {
        const user = TestDataGenerator.validUser();
        user.email = TEST_USER.email;

        await header.openRegisterPopup();
        await registerPopup.register(user);

        await expect(page.getByText('Đăng ký thành công')).not.toBeVisible({ timeout: 5_000 });
    });

    test('TC03 - Register fails with weak password', async ({ page }) => {
        const user = TestDataGenerator.userWithWeakPassword();

        await header.openRegisterPopup();
        await registerPopup.register(user);

        await expect(registerPopup.dialog).toBeVisible();
    });

    test('TC04 - Login successfully with valid credentials', async ({ page }) => {
        await header.openLoginPopup();
        await loginPopup.login(TEST_USER.email, TEST_USER.password);

        await expect(page.getByText('Đăng nhập thành công')).toBeVisible({ timeout: 10_000 });
        await expect(loginPopup.dialog).toBeHidden({ timeout: 5_000 });

        const isLoggedIn = await header.isLoggedIn();
        expect(isLoggedIn).toBeTruthy();
    });

    test('TC05 - Login fails with wrong email/password', async ({ page }) => {
        const creds = TestDataGenerator.invalidCredentials();

        await header.openLoginPopup();
        await loginPopup.login(creds.email, creds.password);

        await expect(page.getByText('Đăng nhập thành công')).not.toBeVisible({ timeout: 5_000 });
    });

    test('TC06 - Logout successfully', async ({ page }) => {
        await header.openLoginPopup();
        await loginPopup.login(TEST_USER.email, TEST_USER.password);
        await expect(page.getByText('Đăng nhập thành công')).toBeVisible({ timeout: 10_000 });

        await header.logout();
        await expect(header.signOutBtn).toBeHidden({ timeout: TIMEOUTS.MEDIUM });
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        const isLoggedIn = await header.isLoggedIn();
        expect(isLoggedIn).toBeFalsy();
    });

    test('TC07 - Validate error messages display correctly', async ({ page }) => {
        await header.openLoginPopup();
        await loginPopup.waitForOpen();
        await loginPopup.submitBtn.click();

        await expect(loginPopup.dialog).toBeVisible();

        await loginPopup.close();
        await expect(loginPopup.dialog).toBeHidden({ timeout: 10_000 });

        await header.openRegisterPopup();
        await registerPopup.waitForOpen();
        const invalidUser = TestDataGenerator.validUser();
        invalidUser.email = 'notanemail';
        await registerPopup.nameInput.fill(invalidUser.name);
        await registerPopup.emailInput.fill(invalidUser.email);
        await registerPopup.submitBtn.click();

        await expect(registerPopup.dialog).toBeVisible();
    });
});
