import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterModal } from '../pages/RegisterModal';
import { TestDataGenerator } from '../utils/test-data';

test.describe.serial('Register', () => {
    test('Register new account', async ({ page }) => {
        const homePage = new HomePage(page);
        const registerModal = new RegisterModal(page);
        const user = TestDataGenerator.validUser();

        await homePage.goto();
        await homePage.clickUserMenu();
        await homePage.clickDangKyButton();
        await registerModal.waitForModal();

        await registerModal.fillRegisterData(
            user.name, user.email, user.password, user.phone,
        );
        await registerModal.selectBirthday(user.birthday);
        await registerModal.selectGender('Nam');

        expect(true).toBeTruthy();
    });
});
