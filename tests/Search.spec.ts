import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { Helper } from '../utils/helper';

test.describe('Search and Booking Module ====>', () => {
    // test('TC08: Search for a location : Hồ Chí Minh', async ({ page }) => {
    //     // Initialize HomePage object
    //     const homePage = new HomePage(page);

    //     // Step1: Access website
    //     await homePage.goto();

    //     // Step2: Click on location select
    //     await homePage.selectLocation("Hồ Chí Minh");

    //     //Check if "Hồ Chí Minh" option is displayed
    //     await expect(
    //         page.locator('p.font-bold', { hasText: 'Hồ Chí Minh' })
    //     ).toBeVisible();

    //     // Step3: Click Search Icon Button
    //     await homePage.clickSearchIconButton();

    //     // 1. Summary text
    //     await expect(
    //         page.locator('p', { hasText: 'chỗ ở tại Hồ Chí Minh' })
    //     ).toBeVisible();

    //     // 2. Room list appears
    //     const roomCards = page.locator('.ant-card');
    //     await expect(roomCards.first()).toBeVisible();

    //     // 3. Room content correct
    //     await expect(roomCards.first()).toContainText('Hồ Chí Minh');

    // });

    
    test('TC09: Search for check-in/check-out', async ({ page }) => {
        //Initialize HomePage object
        const homePage = new HomePage(page);

        //Access website
        await homePage.goto();

        //Generate dynamic dates (check-in: tomorrow, check-out: check-in + 5 days)
        const { checkIn, checkOut } = Helper.generateSearchDates();

        //Select check-in/check-out date
        await homePage.selectCheckInOutDate(checkIn, checkOut);

        //Verify dates are displayed on home page
        const expected = Helper.SearchModule.expectCheckInOutDisplayed(checkIn, checkOut);

        await expect(
            page.locator('p', { hasText: expected })
        ).toBeVisible();

        //Click Search Icon Button
        await homePage.clickSearchIconButton();

        //Verify search results summary is displayed
        const resultSummary = page.locator('p', {
            hasText: 'chỗ ở tại'
        });

        await expect(resultSummary).toBeVisible();
        await expect(resultSummary).toContainText(checkIn);
        await expect(resultSummary).toContainText(checkOut);

    });

    // TC10: Search for number of guests
    test('TC10: Search for number of guests', async ({ page }) => {
        // Initialize HomePage object
        const homePage = new HomePage(page);

        // Step1: Access website
        await homePage.goto();

        // Step2: Select number of guests (2 guests)
        const numGuests = 2;
        await homePage.selectGuests(numGuests);

        // Step3: Click Search Icon Button
        await homePage.clickSearchIconButton();

        // Step4: Scroll down to view search results
        await homePage.scrollDown(400);

        // Step5: Verify room cards are displayed with guest information
        const roomCards = page.locator('.ant-card');
        await expect(roomCards.first()).toBeVisible();

        // Step6: Verify room details contain guest capacity information
        // Expected format: "3 khách • Phòng studio • 1 phòng ngủ • 1 giường • 1 phòng tắm"
        const roomDetailInfo = page.locator('p.text-gray-500.text-md.truncate').first();
        
        if (await roomDetailInfo.isVisible()) {
            await expect(roomDetailInfo).toBeVisible();
            
            // Verify the room info contains "khách" (guests) information
            const infoText = await roomDetailInfo.textContent();
            const guestMatch = infoText?.match(/(\d+)\s*khách/);
            
            if (guestMatch) {
                const roomCapacity = parseInt(guestMatch[1]);
                // Verify room capacity is >= selected guests
                expect(roomCapacity).toBeGreaterThanOrEqual(numGuests);
            }
        }
    });

    // TC11: Filter by price range
    // test('TC11: Filter by price range', async ({ page }) => {
    //     // Initialize HomePage object
    //     const homePage = new HomePage(page);

    //     // Step1: Access website
    //     await homePage.goto();

    //     // Step2: Do a basic search first
    //     await homePage.selectLocation('Hồ Chí Minh');
    //     await homePage.selectCheckInOutDate('07/02/2026', '14/02/2026');
    //     await homePage.clickSearchIconButton();

    //     // Step3: Wait for filters to load
    //     await page.waitForTimeout(3000);

    //     // Step4: Set price range filter (example: min price)
    //     const priceFilterInput = page.locator('input[placeholder*="giá"]').first();
        
    //     if (await priceFilterInput.isVisible()) {
    //         await priceFilterInput.fill('500000');
    //         await page.waitForTimeout(1500);
    //     }

    //     // Step5: Verify filtered results are displayed
    //     const roomCards = page.locator('.ant-card');
        
    //     if (await roomCards.count() > 0) {
    //         await expect(roomCards.first()).toBeVisible();
    //     }
    // });

    // TC12: View room details
    // test('TC12: View room details', async ({ page }) => {
    //     // Initialize HomePage object
    //     const homePage = new HomePage(page);

    //     // Step1: Access website
    //     await homePage.goto();

    //     // Step2: Do a search
    //     await homePage.selectLocation('Hồ Chí Minh');
    //     await homePage.selectCheckInOutDate('07/02/2026', '14/02/2026');
    //     await homePage.clickSearchIconButton();

    //     // Step3: Wait for results to load
    //     await page.waitForTimeout(3000);

    //     // Step4: Click on first room card to view details
    //     const firstRoomCard = page.locator('.ant-card').first();
        
    //     if (await firstRoomCard.isVisible()) {
    //         await firstRoomCard.click();
    //         await page.waitForTimeout(3000);

    //         // Step5: Verify room detail page is opened
    //         const roomDetailContent = page.locator('[class*="detail"], [class*="room-info"]');
            
    //         // Alternative: check for back button or room name/description
    //         const pageTitle = page.locator('h1, h2').first();
    //         await expect(pageTitle).toBeVisible();
    //     }
    // });

    // TC13: Verify complete room information display
    // test('TC13: Verify complete room information display', async ({ page }) => {
    //     // Initialize HomePage object
    //     const homePage = new HomePage(page);

    //     // Step1: Access website
    //     await homePage.goto();

    //     // Step2: Do a search
    //     await homePage.selectLocation('Hồ Chí Minh');
    //     await homePage.selectCheckInOutDate('07/02/2026', '14/02/2026');
    //     await homePage.clickSearchIconButton();

    //     // Step3: Wait for results to load
    //     await page.waitForTimeout(3000);

    //     // Step4: Get first room card and verify it contains essential info
    //     const firstRoomCard = page.locator('.ant-card').first();
        
    //     if (await firstRoomCard.isVisible()) {
    //         // Verify room name/title exists
    //         const roomName = firstRoomCard.locator('h3, h4, .room-name').first();
    //         await expect(roomName).toBeVisible();

    //         // Verify price information exists
    //         const priceInfo = firstRoomCard.locator('[class*="price"]').first();
    //         if (await priceInfo.isVisible()) {
    //             await expect(priceInfo).toBeVisible();
    //         }

    //         // Verify image exists
    //         const roomImage = firstRoomCard.locator('img').first();
    //         await expect(roomImage).toBeVisible();

    //         // Verify location/address exists
    //         const address = firstRoomCard.locator('[class*="address"], [class*="location"]').first();
    //         if (await address.isVisible()) {
    //             await expect(address).toBeVisible();
    //         }
    //     }
    // });

    // TC14: Test pagination functionality
    // test('TC14: Test pagination functionality', async ({ page }) => {
    //     // Initialize HomePage object
    //     const homePage = new HomePage(page);

    //     // Step1: Access website
    //     await homePage.goto();

    //     // Step2: Do a search to get results
    //     await homePage.selectLocation('Hồ Chí Minh');
    //     await homePage.selectCheckInOutDate('07/02/2026', '14/02/2026');
    //     await homePage.clickSearchIconButton();

    //     // Step3: Wait for results to load
    //     await page.waitForTimeout(3000);

    //     // Step4: Look for pagination controls
    //     const paginationButtons = page.locator('[class*="ant-pagination"] button, .pagination button');
    //     const paginationCount = await paginationButtons.count();

    //     if (paginationCount > 0) {
    //         // Get initial room count
    //         const initialRooms = page.locator('.ant-card');
    //         const initialCount = await initialRooms.count();

    //         // Navigate to next page
    //         const nextButton = page.locator('[class*="next"], [aria-label*="next"]').first();
            
    //         if (await nextButton.isVisible() && !nextButton.isDisabled()) {
    //             await nextButton.click();
    //             await page.waitForTimeout(2000);

    //             // Verify new results are loaded
    //             const newRooms = page.locator('.ant-card');
    //             await expect(newRooms.first()).toBeVisible();
    //         }
    //     }
    // });

    // TC15: Sort results by price/rating
    // test('TC15: Sort results by price/rating', async ({ page }) => {
    //     // Initialize HomePage object
    //     const homePage = new HomePage(page);

    //     // Step1: Access website
    //     await homePage.goto();

    //     // Step2: Do a search
    //     await homePage.selectLocation('Hồ Chí Minh');
    //     await homePage.selectCheckInOutDate('07/02/2026', '14/02/2026');
    //     await homePage.clickSearchIconButton();

    //     // Step3: Wait for results to load
    //     await page.waitForTimeout(3000);

    //     // Step4: Look for sort dropdown/button
    //     const sortDropdown = page.locator('select[class*="sort"], button[class*="sort"], [class*="sort-by"]').first();

    //     if (await sortDropdown.isVisible()) {
    //         await sortDropdown.click();
    //         await page.waitForTimeout(1000);

    //         // Step5: Select sort option (e.g., price low to high)
    //         const sortOption = page.locator('div[role="option"], li[role="option"]').first();
            
    //         if (await sortOption.isVisible()) {
    //             await sortOption.click();
    //             await page.waitForTimeout(2000);

    //             // Verify results are re-sorted
    //             const roomCards = page.locator('.ant-card');
    //             await expect(roomCards.first()).toBeVisible();
    //         }
    //     } else {
    //         // If no explicit sort dropdown, just verify rooms are displayed and can be viewed
    //         const roomCards = page.locator('.ant-card');
    //         await expect(roomCards.first()).toBeVisible();
    //     }
    // });
});
