import { test } from '@playwright/test';
import { RoomCard } from '../pages/RoomCard';
import { HomePage } from '../pages/HomePage';
import { Helper } from '../utils/helper';
import { TIMEOUTS } from '../constants';
import { SearchTestData, RoomTestData } from '../utils/test-data';
test.describe.serial('Room card Module ====>', () => {
    test('TC: Verify that the information displayed on the room card  is complete.', async ({ page }) => {
        // Initialize 
        const homePage = new HomePage(page);
        const roomcard = new RoomCard(page);

        // Step1: Access website
        await homePage.goto();

        // Step2: Do a search using test data location
        await homePage.selectLocation(SearchTestData.DEFAULT_LOCATION);
        await homePage.clickSearchIconButton();

        // Step3: Wait for results to load
        await page.waitForTimeout(TIMEOUTS.SHORT);

        // Step4: Scroll gradually to bottom of page
        await Helper.scrollDown(homePage.page, 300);

        // Step5: Verify top rooms have complete information using test data
        await roomcard.verifyTopRoomCardsHaveFullInfo(RoomTestData.TOP_ROOMS_TO_VERIFY);
    });
});