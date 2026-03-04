import { test } from '@playwright/test';
import { RoomCard } from '../pages/RoomCard';
import { HomePage } from '../pages/HomePage';
import { Helper } from '../utils/helper';
import { TIMEOUTS } from '../constants';
test.describe.serial('Room card Module ====>', () => {
    test('TC: Verify that the information displayed on the room card  is complete.', async ({ page }) => {
        // Initialize 
        const homePage = new HomePage(page);
        const roomcard = new RoomCard(page);

        // Step1: Access website
        await homePage.goto();

        // Step2: Do a search (location only)
        await homePage.selectLocation('Hồ Chí Minh');
        await homePage.clickSearchIconButton();

        // Step3: Wait for results to load
        await page.waitForTimeout(TIMEOUTS.SHORT);

        // Step4: Scroll gradually to bottom of page
        await Helper.scrollDown(homePage.page, 300);

        // await roomcard.verifyRoomCardHasFullInfo(0); // verify the first card
        // or verify the top 3 cards:
        await roomcard.verifyTopRoomCardsHaveFullInfo(3);
    });
});