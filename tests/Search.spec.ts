import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { Helper } from '../utils/helper';

test.describe.serial('Search and Booking Module ====>', () => {
    test('TC08: Search for a location : Hồ Chí Minh', async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.goto();
        await homePage.selectLocation("Hồ Chí Minh");

        await expect(
            page.locator('p.font-bold', { hasText: 'Hồ Chí Minh' })
        ).toBeVisible();

        await homePage.clickSearchIconButton();

        await expect(
            page.locator('p', { hasText: 'chỗ ở tại Hồ Chí Minh' })
        ).toBeVisible();

        const roomCards = page.locator('.ant-card');
        await expect(roomCards.first()).toBeVisible();
        await expect(roomCards.first()).toContainText('Hồ Chí Minh');
    });

    test('TC09: Search for check-in/check-out', async ({ page }) => {
        const homePage = new HomePage(page);
        const { checkIn, checkOut } = Helper.futureDateRange(3, 7);

        await homePage.goto();
        await homePage.selectCheckInOutDate(checkIn, checkOut);

        const expected = Helper.SearchModule.expectCheckInOutDisplayed(checkIn, checkOut);

        await expect(
            page.locator('p', { hasText: expected })
        ).toBeVisible();

        await homePage.clickSearchIconButton();

        const resultSummary = page.locator('p', {
            hasText: 'chỗ ở tại'
        });

        await expect(resultSummary).toContainText(checkIn);
        await expect(resultSummary).toContainText(checkOut);
    });

    // test('TC10: Search for number of guests', async ({ page }) => {

    // });

    // TC11: Filter theo khoảng giá
    // test('TC11: Filter by price range', async ({ page }) => {

    // });

    // TC12: Xem chi tiết phòng
    // test('TC12: View room details', async ({ page }) => {

    // });

    // TC13: Kiểm tra thông tin phòng hiển thị đầy đủ
    // test('TC13: Verify complete room information display', async ({ page }) => {

    // });

    // TC14: Test chức năng pagination
    // test('TC14: Test pagination functionality', async ({ page }) => {

    // });

    // TC15: Sort kết quả theo giá/đánh giá
    // test('TC15: Sort results by price/rating', async ({ page }) => {

    // });
});
