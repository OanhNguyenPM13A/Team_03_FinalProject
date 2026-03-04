import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RoomDetailsPage } from '../pages/RoomDetailsPage';
import { HeaderComponent } from '../pages/HeaderComponent';
import { LoginPopup } from '../pages/LoginPopup';
import { Helper } from '../utils/helper';
import { TEST_USER } from '../constants';

// Run all tests in this describe block sequentially (one after another)
test.describe.serial('RoomDetails ====>', () => {
    // TC: View room details
    test('TC12: View room details', async ({ page }) => {
        // Initialize HomePage object
        const homePage = new HomePage(page);

        // Step1: Access website
        await homePage.goto();

        // Step2: Do a search (location only)
        await homePage.selectLocation('Hồ Chí Minh');
        await homePage.clickSearchIconButton();

        // Step3: Wait for results to load
        await page.waitForTimeout(2000);

        // Step4: Scroll gradually to bottom of page
        await Helper.scrollToBottom(page, 300, 500);

        // Step5: Click on first room card to view details
        await homePage.clickRoomCard(0);

        // Step6: Verify room detail page is opened by checking URL
        await expect(page).toHaveURL(/\/room-detail\/\d+/);
        
    });

     // TC: Verify login required alert when not logged in
    test('TC13: Verify complete room information display (without sign in)', async ({ page }) => {
        // Initialize HomePage and RoomDetailsPage objects
        const homePage = new HomePage(page);
        const roomDetailsPage = new RoomDetailsPage(page);

        // Step1: Access website
        await homePage.goto();

        // Step2: Do a search (location only)
        await homePage.selectLocation('Hồ Chí Minh');
        await homePage.clickSearchIconButton();

        // Step3: Wait for results to load
        await page.waitForTimeout(2000);

        // Step4: Scroll gradually to bottom of page
        await Helper.scrollDown(page, 300);

        // Step5: Click on first room card to view details
        await homePage.clickRoomCard(0);

        // Step6: Wait for room details page to load
        await page.waitForTimeout(2000);

        // Step7: Scroll down on details page to see all information
        await Helper.scrollToBottom(page, 300, 500);

        // Step8: Verify room title is displayed
        await expect(roomDetailsPage.roomTitle).toBeVisible();
        
        // Step9: Verify room location is displayed
        await expect(roomDetailsPage.roomLocation).toBeVisible();

        // Step10: Verify room description is displayed
        await expect(roomDetailsPage.roomDescription).toBeVisible();

        // Step11: Verify room image is displayed
        await expect(roomDetailsPage.roomIMG).toBeVisible();

        // Step12: Verify price information is displayed
        await expect(roomDetailsPage.price).toBeVisible();

        // Step13: Verify number of guests information is displayed
        await expect(roomDetailsPage.numberGuest).toBeVisible();

        // Step14: Verify room utilities section is displayed
        await expect(roomDetailsPage.roomUtilities).toBeVisible();

        // Step15: Verify booking form is displayed
        await expect(roomDetailsPage.formBooking).toBeVisible();

        // Step16: Verify comments/reviews section is displayed
        await expect(roomDetailsPage.commentsList).toBeVisible();

        // Step17: Verify login required alert is displayed instead of comment form
        // Alert message: "Cần đăng nhập để bình luận"
        await expect(roomDetailsPage.loginRequiredAlert).toBeVisible();
        
        // Step18: Verify login required alert contains correct text
        await expect(roomDetailsPage.loginRequiredAlert).toContainText('Cần đăng nhập để bình luận');
    });

    // TC: Verify complete room information display
    test('TC: Verify complete room information display (sign in)', async ({ page }) => {
        // Initialize page object classes
        const homePage = new HomePage(page);
        const roomDetailsPage = new RoomDetailsPage(page);
        const header = new HeaderComponent(page);
        const loginPopup = new LoginPopup(page);

        // Step1: Access website
        await homePage.goto();

        // Step2: Open login popup
        await header.openLoginPopup();

        // Step3: Enter email and password
        await loginPopup.login(TEST_USER.email, TEST_USER.password);

        // Step4: Wait for login success toast
        await page.getByText('Đăng nhập thành công').waitFor({ state: 'visible', timeout: 10_000 });

        // Step5: Wait for page to stabilize
        await page.waitForTimeout(2000);

        // Step6: Do a search (location only)
        await homePage.selectLocation('Hồ Chí Minh');
        await homePage.clickSearchIconButton();

        // Step3: Wait for results to load
        await page.waitForTimeout(2000);

        // Step4: Scroll gradually to bottom of page
        await Helper.scrollDown(page, 300);

        // Step5: Click on first room card to view details
        await homePage.clickRoomCard(0);

        // Step6: Wait for room details page to load
        await page.waitForTimeout(2000);

        // Step7: Scroll down on details page to see all information
        await Helper.scrollToBottom(page, 300, 500);

        // Step8: Verify room title is displayed
        await expect(roomDetailsPage.roomTitle).toBeVisible();
        
        // Step9: Verify room location is displayed
        await expect(roomDetailsPage.roomLocation).toBeVisible();

        // Step10: Verify room description is displayed
        await expect(roomDetailsPage.roomDescription).toBeVisible();

        // Step11: Verify room image is displayed
        await expect(roomDetailsPage.roomIMG).toBeVisible();

        // Step12: Verify price information is displayed
        await expect(roomDetailsPage.price).toBeVisible();

        // Step13: Verify number of guests information is displayed
        await expect(roomDetailsPage.numberGuest).toBeVisible();

        // Step14: Verify room utilities section is displayed
        await expect(roomDetailsPage.roomUtilities).toBeVisible();

        // Step15: Verify booking form is displayed
        await expect(roomDetailsPage.formBooking).toBeVisible();

        // Step16: Verify comments/reviews section is displayed
        await expect(roomDetailsPage.commentsList).toBeVisible();

        // Step17: Verify comment form is displayed
        await expect(roomDetailsPage.formComment).toBeVisible();
    });

   

});
