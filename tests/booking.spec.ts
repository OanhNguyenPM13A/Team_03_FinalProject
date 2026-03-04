import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { Booking } from '../pages/Booking';
import { Helper } from '../utils/helper';
import { TEST_USER } from '../constants';
import { RoomDetailsPage } from '../pages/RoomDetailsPage';
import { HeaderComponent } from '../pages/HeaderComponent';
import { LoginPopup } from '../pages/LoginPopup';

test.describe.serial('Booking Module ====>', () => {

    // TC: Verify booking form displays correctly with all elements
    // test('TC: Verify booking form displays all elements', async ({ page }) => {
    //     // Initialize page objects
    //     const homePage = new HomePage(page);
    //     const roomDetailsPage = new RoomDetailsPage(page);
    //     const booking = new Booking(page);

    //     // Step1: Access website
    //     await homePage.goto();

    //     // Step2: Select location
    //     await homePage.selectLocation('Hồ Chí Minh');
    //     await homePage.clickSearchIconButton();

    //     // Step3: Wait for results to load
    //     await page.waitForTimeout(2000);

    //     // Step4: Scroll down to see room cards
    //     await Helper.scrollDown(page, 300);

    //     // Step5: Click on first room card to view details
    //     await homePage.clickRoomCard(0);

    //     // Step6: Wait for room details page to load
    //     await page.waitForTimeout(2000);

    //     // Step7: Scroll to booking form area
    //     await Helper.scrollDown(page, 400);

    //     // Step8: Verify booking form is visible
    //     await expect(booking.bookingForm).toBeVisible();

    //     // Step9: Verify price per night is displayed
    //     await expect(booking.pricePerNight).toBeVisible();
    //     const priceText = await booking.getPricePerNight();
    //     expect(priceText).toMatch(/\$\d+/);

    //     // Step10: Verify rating section is displayed
    //     await expect(booking.ratingStars).toBeVisible();
    //     await expect(booking.ratingScore).toBeVisible();
    //     await expect(booking.reviewCount).toBeVisible();

    //     // Step11: Verify check-in date input is displayed
    //     await expect(booking.checkInInput).toBeVisible();
    //     const checkInDate = await booking.getCheckInDate();
    //     expect(checkInDate).toMatch(/\d{2}-\d{2}-\d{4}/);

    //     // Step12: Verify check-out date input is displayed
    //     await expect(booking.checkOutInput).toBeVisible();
    //     const checkOutDate = await booking.getCheckOutDate();
    //     expect(checkOutDate).toMatch(/\d{2}-\d{2}-\d{4}/);

    //     // Step13: Verify guest selector is displayed
    //     await expect(booking.guestCount).toBeVisible();
    //     const guestText = await booking.getGuestCount();
    //     expect(guestText).toBeTruthy();

    //     // Step14: Verify guest increase/decrease buttons are visible
    //     await expect(booking.decreaseGuestBtn).toBeVisible();
    //     await expect(booking.increaseGuestBtn).toBeVisible();

    //     // Step15: Verify booking button is displayed
    //     await expect(booking.bookingBtn).toBeVisible();
    // });

    // TC Validate booking form calculations (price breakdown)
    // test('TC: Validate price breakdown calculations', async ({ page }) => {
    //     // Initialize page objects
    //     const homePage = new HomePage(page);
    //     const booking = new Booking(page);

    //     // Step1: Access website
    //     await homePage.goto();

    //     // Step2: Select location
    //     await homePage.selectLocation('Hồ Chí Minh');
    //     await homePage.clickSearchIconButton();

    //     // Step3: Wait for results to load
    //     await page.waitForTimeout(2000);

    //     // Step4: Scroll down to see room cards
    //     await Helper.scrollDown(page, 300);

    //     // Step5: Click on first room card to view details
    //     await homePage.clickRoomCard(0);

    //     // Step6: Wait for price per night to be visible
    //      await expect(booking.pricePerNight).toBeVisible();

    //     // Step7: Scroll to booking form area
    //     await Helper.scrollDown(page, 600);

    //     // Step8: Wait 
    //     await page.waitForTimeout(3000);

    //     // Step8: Get price per night
    //     const pricePerNightText = await booking.getPricePerNight();
    //     const pricePerNight = Helper.parseMoney(pricePerNightText);
    //     expect(pricePerNight).toBeGreaterThan(0);

    //     // Step9: Get check-in date (format: DD-MM-YYYY)
    //    await expect(booking.checkInDateText).toHaveText(/\d{2}-\d{2}-\d{4}/);
    //    const checkInDateStr = await booking.getCheckInDate();


    //     // Step10: Get check-out date (format: DD-MM-YYYY)
    //     await expect(booking.checkOutDateText).toHaveText(/\d{2}-\d{2}-\d{4}/);
    //     const checkOutDateStr = await booking.getCheckOutDate();

    //     // Step11: Parse dates and calculate number of nights
    //     const checkInDate = Helper.parseDDMMYYYY(checkInDateStr);
    //     const checkOutDate = Helper.parseDDMMYYYY(checkOutDateStr);
    //     const nights = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / 86400000);
    //     expect(nights).toBeGreaterThan(0);

    //     // Step12: Get cleaning fee
    //     const cleaningFeeText = await booking.getCleaningFee();
    //     const cleaningFee = Helper.parseMoney(cleaningFeeText);
    //     expect(cleaningFee).toBeGreaterThanOrEqual(0);

    //     // Step13: Get actual total before taxes
    //     const totalBeforeTaxesText = await booking.getTotalBeforeTaxes();
    //     const actualTotal = Helper.parseMoney(totalBeforeTaxesText);
    //     expect(actualTotal).toBeGreaterThan(0);

    //     // Step14: Calculate expected total = (pricePerNight × nights) + cleaningFee
    //     const expectedTotal = (pricePerNight * nights) + cleaningFee;

    //     // Step15: Verify price breakdown line shows correct calculation
    //     const priceBreakdownText = await booking.getPriceBreakdown();
    //     expect(priceBreakdownText).toContain('$');
    //     expect(priceBreakdownText).toContain(nights.toString());

    //     // Step16: Verify actual total matches expected total
    //     expect(actualTotal).toBe(expectedTotal);
    // });

    // TC: Booking successful (end-to-end flow)
    // test('TC: Booking successful (end-to-end flow)', async ({ page }) => {
    //     // Initialize page objects
    //     const homePage = new HomePage(page);
    //     const header = new HeaderComponent(page);
    //     const loginPopup = new LoginPopup(page);
    //     const booking = new Booking(page);

    //     // Step1: Access website
    //     await homePage.goto();

    //     // Step2: Open login popup
    //     await header.openLoginPopup();

    //     // Step3: Wait for login popup to be visible
    //     await page.waitForTimeout(1500);

    //     // Step4: Login with test user
    //     await loginPopup.login(TEST_USER.email, TEST_USER.password);

    //     // Step5: Wait for login success
    //     await page.getByText('Đăng nhập thành công').waitFor({ state: 'visible', timeout: 10_000 }).catch(() => { });

    //     // Step6: Wait for page to stabilize
    //     await page.waitForTimeout(2000);

    //     // Step7: Select location
    //     await homePage.selectLocation('Hồ Chí Minh');
    //     await homePage.clickSearchIconButton();

    //     // Step8: Wait for results to load
    //     await page.waitForTimeout(2000);

    //     // Step9: Scroll down to see room cards
    //     await Helper.scrollDown(page, 300);

    //     // Step10: Click on first room card to view details
    //     await homePage.clickRoomCard(0);

    //     // Step11: Wait for room details page to load
    //     await page.waitForTimeout(2000);

    //     // Step12: Scroll to booking form area
    //     await Helper.scrollDown(page, 400);

    //     // Step13: Verify booking form is visible
    //     await expect(booking.bookingForm).toBeVisible();

    //     // Step14: Get booking details
    //     const pricePerNightText = await booking.getPricePerNight();
    //     const pricePerNight = Helper.parseMoney(pricePerNightText);
    //     expect(pricePerNight).toBeGreaterThan(0);

    //     // Step15: Get dates
    //     const checkInDateStr = await booking.getCheckInDate();
    //     const checkOutDateStr = await booking.getCheckOutDate();
    //     expect(checkInDateStr).toMatch(/\d{2}-\d{2}-\d{4}/);
    //     expect(checkOutDateStr).toMatch(/\d{2}-\d{2}-\d{4}/);

    //     // Step16: Get guest count
    //     const guestCount = await booking.getGuestCount();
    //     expect(guestCount).toBeTruthy();

    //     // Step17: Click booking button (opens confirm modal)
    //     await booking.clickBooking();

    //     // Step18: Confirm booking
    //     const confirmModal = page.getByRole('dialog');
    //     await expect(confirmModal).toBeVisible();

    //     await confirmModal.getByRole('button', { name: 'Xác nhận' }).click();

    //     // Wait for results to load
    //     await page.waitForTimeout(1000);

    //     // Step19: Verify success notification (Antd)
    //     const successNotice = page.locator('.ant-notification-notice-success');
    //     await expect(successNotice).toBeVisible({ timeout: 10_000 });

    //     await expect(
    //         successNotice.locator('.ant-notification-notice-message')
    //     ).toHaveText(/Thêm mới thành công!/);
    // });

    // TC: Booking failed - Not logged in
    // test('TC: Booking failed - Not logged in', async ({ page }) => {
    //     // Initialize page objects
    //     const homePage = new HomePage(page);
    //     const booking = new Booking(page);

    //     // Step1: Access website
    //     await homePage.goto();

    //     // Step2: Select location
    //     await homePage.selectLocation('Hồ Chí Minh');
    //     await homePage.clickSearchIconButton();

    //     // Step3: Wait for results to load
    //     await page.waitForTimeout(2000);

    //     // Step4: Scroll down to see room cards
    //     await Helper.scrollDown(page, 300);

    //     // Step5: Click on first room card to view details
    //     await homePage.clickRoomCard(0);

    //     // Step6: Wait for room details page to load
    //     await page.waitForTimeout(2000);

    //     // Step7: Scroll to booking form area
    //     await Helper.scrollDown(page, 400);

    //     // Step8: Verify booking form is visible
    //     await expect(booking.bookingForm).toBeVisible();

    //     // Step9: Verify booking button is visible
    //     await expect(booking.bookingBtn).toBeVisible();

    //     // Step10: Click booking button without login
    //     await booking.clickBooking();

    //     // Step11: Wait for alert to appear
    //     await page.waitForTimeout(2000);

    //     // Step12: Verify warning notification wrapper is visible
    //     const alertWrapper = page.locator('.ant-notification-notice-wrapper');
    //     await expect(alertWrapper).toBeVisible();

    //     // Step13: Verify warning class is present (ant-notification-notice-warning)
    //     const warningNotice = page.locator('.ant-notification-notice-warning');
    //     await expect(warningNotice).toBeVisible();

    //     // Step14: Verify title is "Thông báo"
    //     const noticeTitle = page.locator('.ant-notification-notice-message');
    //     await expect(noticeTitle).toHaveText('Thông báo');

    //     // Step15: Get and verify alert description message contains login prompt
    //     const noticeDescription = page.locator('.ant-notification-notice-description');
    //     const alertMessage = await noticeDescription.textContent();
    //     expect(alertMessage?.toLowerCase()).toContain('đăng nhập');
    // });

    // TC: Booking failed - Invalid date
    test('TC: Booking failed - Invalid date', async ({ page }) => {
        // Initialize page objects
        const homePage = new HomePage(page);
        const header = new HeaderComponent(page);
        const loginPopup = new LoginPopup(page);
        const booking = new Booking(page);

        // Step1: Access website
        await homePage.goto();

        // Step2: Open login popup
        await header.openLoginPopup();

        // Step3: Wait for login popup to be visible
        await page.waitForTimeout(1500);

        // Step4: Login with test user
        await loginPopup.login(TEST_USER.email, TEST_USER.password);

        // Step5: Wait for login success
        await page.getByText('Đăng nhập thành công').waitFor({ state: 'visible', timeout: 10_000 }).catch(() => {});

        // Step6: Wait for page to stabilize
        await page.waitForTimeout(2000);

        // Step7: Select location
        await homePage.selectLocation('Hồ Chí Minh');
        await homePage.clickSearchIconButton();

        // Step8: Wait for results to load
        await page.waitForTimeout(2000);

        // Step9: Scroll down to see room cards
        await Helper.scrollDown(page, 300);

        // Step10: Click on first room card to view details
        await homePage.clickRoomCard(0);

        // Step11: Wait for room details page to load
        await page.waitForTimeout(2000);

        // Step12: Scroll to booking form area
        await Helper.scrollDown(page, 400);

        // Step13: Verify booking form is visible
        await expect(booking.bookingForm).toBeVisible();

        // Step14: Click check-in date input to open date picker
        await booking.clickCheckInDateInput();
        const dialog = page.getByRole('dialog');
        await expect(dialog).toBeVisible();

        // Step15: Select an invalid date (e.g. a past date like "Last Week")
        await dialog.getByText('Last Week', { exact: true }).click();

        // Step16: Close the date picker dialog
        await dialog.getByRole('button', { name: /close/i }).click();
        await expect(dialog).toBeHidden();

        // Step17: Get check-in date after selection (should be invalid/past date)
        const checkInDateStr = await booking.getCheckInDate();
        expect(checkInDateStr).toBeTruthy();

        // Step18: Get check-out date for comparison
        const checkOutDateStr = await booking.getCheckOutDate();
        expect(checkOutDateStr).toBeTruthy();

        // Step19: Click booking button to attempt booking with invalid dates
        await booking.clickBooking();

        // Step20: Wait for response/alert
        await page.waitForTimeout(2000);

        // Step21: Confirm booking
        const confirmModal = page.getByRole('dialog');
        await expect(confirmModal).toBeVisible();

        await confirmModal.getByRole('button', { name: 'Xác nhận' }).click();

        // Step22: Verify NO success notification is shown
        const successNotice = page.locator('.ant-notification-notice-success');
        await expect(successNotice).not.toBeVisible({ timeout: 5000 });

        // Step23: Verify error or warning notification IS shown
        const errorToast = page.locator('.ant-notification-notice-error, .ant-notification-notice-warning');
        await expect(errorToast).toBeVisible({ timeout: 5000 });

        // Step24: Get error message text
        const errorMessage = await errorToast.locator('.ant-notification-notice-description').textContent();
        expect(errorMessage?.toLowerCase()).toMatch(/ngày|date|hợp lệ|valid|phòng/i);
    });

    // TC: Test guest count modification
    // test('TC: Test guest count modification', async ({ page }) => {
    //     // Initialize page objects
    //     const homePage = new HomePage(page);
    //     const booking = new Booking(page);

    //     // Step1: Access website
    //     await homePage.goto();

    //     // Step2: Select location
    //     await homePage.selectLocation('Hồ Chí Minh');
    //     await homePage.clickSearchIconButton();

    //     // Step3: Wait for results to load
    //     await page.waitForTimeout(2000);

    //     // Step4: Scroll down to see room cards
    //     await Helper.scrollDown(page, 300);

    //     // Step5: Click on first room card to view details
    //     await homePage.clickRoomCard(0);

    //     // Step6: Wait for room details page to load
    //     await page.waitForTimeout(2000);

    //     // Step7: Scroll to booking form area
    //     await Helper.scrollToBottom(page, 100, 500);

    //     // Step8: Get initial guest count
    //     const initialGuestCount = await booking.getGuestCount();

    //     // Step9: Increase guest count
    //     await booking.increaseGuest();

    //     // Step10: Verify guest count increased
    //     const increasedGuestCount = await booking.getGuestCount();
    //     expect(parseInt(increasedGuestCount)).toBeGreaterThan(parseInt(initialGuestCount));

    //     // Step11: Decrease guest count
    //     await booking.decreaseGuest();

    //     // Step12: Verify guest count decreased
    //     const decreasedGuestCount = await booking.getGuestCount();
    //     expect(parseInt(decreasedGuestCount)).toEqual(parseInt(initialGuestCount));
    // });

});
