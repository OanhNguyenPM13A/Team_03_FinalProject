import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RoomDetailsPage } from '../pages/RoomDetailsPage';
import { HeaderComponent } from '../pages/HeaderComponent';
import { LoginPopup } from '../pages/LoginPopup';
import { Helper } from '../utils/helper';
import { TEST_USER } from '../constants';
import { SearchTestData, RoomTestData } from '../utils/test-data';

// Run all tests in this describe block sequentially (one after another)
test.describe.serial('RoomDetails ====>', () => {
    // TC: View room details
    test('TC12: View room details', async ({ page }) => {
        // Initialize HomePage object
        const homePage = new HomePage(page);

        // Step1: Access website
        await homePage.goto();

        // Step2: Do a search using test data
        await homePage.selectLocation(SearchTestData.DEFAULT_LOCATION);
        await homePage.clickSearchIconButton();

        // Step3: Wait for results to load
        await page.waitForTimeout(2000);

        // Step4: Scroll gradually to bottom of page
        await Helper.scrollToBottom(page, 300, 500);

        // Step5: Click on first room card to view details
        await homePage.clickRoomCard(RoomTestData.ROOM_INDICES.first);

        // Step6: Verify room detail page is opened by checking URL
        await expect(page).toHaveURL(RoomTestData.URL_PATTERNS.roomDetail);
        
    });

     // TC: Verify login required alert when not logged in
    test('TC13: Verify complete room information display (without sign in)', async ({ page }) => {
        // Initialize HomePage and RoomDetailsPage objects
        const homePage = new HomePage(page);
        const roomDetailsPage = new RoomDetailsPage(page);

        // Step1: Access website
        await homePage.goto();

        // Step2: Do a search using test data
        await homePage.selectLocation(SearchTestData.DEFAULT_LOCATION);
        await homePage.clickSearchIconButton();

        // Step3: Wait for results to load
        await page.waitForTimeout(2000);

        // Step4: Scroll gradually to bottom of page
        await Helper.scrollDown(page, 300);

        // Step5: Click on first room card to view details
        await homePage.clickRoomCard(RoomTestData.ROOM_INDICES.first);

        // Step6: Wait for room details page to load
        await page.waitForTimeout(2000);

        // Step7: Scroll down on details page to see all information
        await Helper.scrollToBottom(page, 300, 500);

        // Step8: Verify room title is displayed
        await expect(roomDetailsPage.roomTitle).toBeVisible();
        
        // Step9: Verify room location is displayed
        await expect(roomDetailsPage.roomLocation).toBeVisible();

        // Step10: Verify room host type is displayed
        await expect(roomDetailsPage.roomHost).toBeVisible();

        // Step11: Verify room type is displayed
        await expect(roomDetailsPage.roomType).toBeVisible();

        // Step12: Verify room image is displayed
        await expect(roomDetailsPage.roomIMG).toBeVisible();

        // Step13: Verify number of rooms is displayed
        await expect(roomDetailsPage.numberRooms).toBeVisible();

        // Step14: Verify number of beds is displayed
        await expect(roomDetailsPage.numberBed).toBeVisible();

        // Step15: Verify price information is displayed
        await expect(roomDetailsPage.price).toBeVisible();

        // Step16: Verify number of guests information is displayed
        await expect(roomDetailsPage.numberGuest).toBeVisible();

        // Step17: Verify room utilities section is displayed
        await expect(roomDetailsPage.roomUtilities).toBeVisible();

        // Step18: Verify booking form is displayed
        await expect(roomDetailsPage.formBooking).toBeVisible();

        // Step19: Verify comments/reviews section is displayed
        await expect(roomDetailsPage.commentsList).toBeVisible();

        // Step20: Verify login required alert is displayed instead of comment form
        await expect(roomDetailsPage.loginRequiredAlert).toBeVisible();
        
        // Step21: Verify login required alert contains correct text
        await expect(roomDetailsPage.loginRequiredAlert).toContainText(SearchTestData.SEARCH_RESULT_MESSAGES.loginRequired);
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

        // Step6: Do a search using test data
        await homePage.selectLocation(SearchTestData.DEFAULT_LOCATION);
        await homePage.clickSearchIconButton();

        // Step7: Wait for results to load
        await page.waitForTimeout(2000);

        // Step8: Scroll gradually to bottom of page
        await Helper.scrollDown(page, 300);

        // Step9: Click on first room card to view details
        await homePage.clickRoomCard(RoomTestData.ROOM_INDICES.first);

        // Step10: Wait for room details page to load
        await page.waitForTimeout(2000);

        // Step11: Scroll down on details page to see all information
        await Helper.scrollToBottom(page, 300, 500);

        // Step12: Verify room title is displayed
        await expect(roomDetailsPage.roomTitle).toBeVisible();
        
        // Step13: Verify room location is displayed
        await expect(roomDetailsPage.roomLocation).toBeVisible();

        // Step14: Verify room host type is displayed
        await expect(roomDetailsPage.roomHost).toBeVisible();

        // Step15: Verify room type is displayed
        await expect(roomDetailsPage.roomType).toBeVisible();

        // Step16: Verify room image is displayed
        await expect(roomDetailsPage.roomIMG).toBeVisible();

        // Step17: Verify number of rooms is displayed
        await expect(roomDetailsPage.numberRooms).toBeVisible();

        // Step18: Verify number of beds is displayed
        await expect(roomDetailsPage.numberBed).toBeVisible();

        // Step19: Verify price information is displayed
        await expect(roomDetailsPage.price).toBeVisible();

        // Step20: Verify number of guests information is displayed
        await expect(roomDetailsPage.numberGuest).toBeVisible();

        // Step21: Verify room utilities section is displayed
        await expect(roomDetailsPage.roomUtilities).toBeVisible();

        // Step22: Verify booking form is displayed
        await expect(roomDetailsPage.formBooking).toBeVisible();

        // Step23: Verify comments/reviews section is displayed
        await expect(roomDetailsPage.commentsList).toBeVisible();

        // Step24: Verify comment form is displayed
        await expect(roomDetailsPage.formComment).toBeVisible();
    });

   

});
