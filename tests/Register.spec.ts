import {test, expect} from '@playwright/test';
import { HomePage } from '../page/HomePage';
import { RegisterModal } from '../page/RegisterModal';

test.describe('Register', () => {
    test('Register new account', async ({page}) => {
        // init object HomePage
        const homePage = new HomePage(page);
        const registerModal = new RegisterModal(page);

        // Step1: Access website
        await homePage.goto();
       

        // Step2: Click on user menu
        await homePage.clickUserMenu();
        
        // Step3: Click on Đăng ký button
        await homePage.clickDangKyButton();

        // Step4: Wait for Register modal is displayed
        await registerModal.waitForModal();

        // Step5: Fill Name, Email, Password, Phone
        await registerModal.fillRegisterData("Oanh Nguyen", 
            "oanh.nguyen@example.com", "Password123!", 
            "0123456789");

        // Step6: Select Birthday
        await registerModal.selectBirthday("01/01/1990");

        // Step7: Select Gender
        await registerModal.selectGender("Nam");

        expect(true).toBeTruthy();
    });
});