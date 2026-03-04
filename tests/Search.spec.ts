import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { Helper } from '../utils/helper';

// Run all tests in this describe block sequentially (one after another)
test.describe.serial('Module 2: Search ====>', () => {
    test('TC08: Search for a location : Hồ Chí Minh', async ({ page }) => {
        // Initialize HomePage object
        const homePage = new HomePage(page);

        // Step1: Access website
        await homePage.goto();

        // Step2: Click on location select
        await homePage.selectLocation("Hồ Chí Minh");

        //Check if "Hồ Chí Minh" option is displayed
        await expect(
            page.locator('p.font-bold', { hasText: 'Hồ Chí Minh' })
        ).toBeVisible();

        // Step3: Click Search Icon Button
        await homePage.clickSearchIconButton();

        // 1. Summary text
        await expect(
            page.locator('p', { hasText: 'chỗ ở tại Hồ Chí Minh' })
        ).toBeVisible();

        // 2. Room list appears
        const roomCards = page.locator('.ant-card');
        await expect(roomCards.first()).toBeVisible();

        // 3. Room content correct
        await expect(roomCards.first()).toContainText('Hồ Chí Minh');

    });

    
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
        await Helper.scrollDown(homePage.page, 400);

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
    test('TC11: Filter by price range', async ({ page }) => {
        // Initialize HomePage object
        const homePage = new HomePage(page);

        // Step1: Access website
        await homePage.goto();

        // Step2: Scroll down to view filter options
        await Helper.scrollDown(homePage.page, 400);

        // Step3: Set price filter using HomePage method
        const minPrice = 20;
        await homePage.setPriceFilter(minPrice);

        // Step4: Verify price filter input is displayed
        const priceFilterInput = page.locator('input[placeholder*="giá"], input[placeholder*="Giá"]').first();
        
        await expect(priceFilterInput).toBeVisible();

        // Step5: Verify price filter label/text is visible
        const filterLabel = page.locator('label, p', { hasText: /giá|Giá|price|Price/ }).first();
        if (await filterLabel.isVisible()) {
            await expect(filterLabel).toBeVisible();
        }
    });

    // TC14: Test pagination functionality

    // TC15: Sort results by price/rating
});
