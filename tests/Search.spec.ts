import { test, expect } from '@playwright/test';
import { HomePage } from '../page/HomePage';

test.describe('Search and Booking Module ====>', () => {
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

    });
    
    test('TC10: Search for number of guests', async ({ page }) => {

    });

    // TC11: Filter theo khoảng giá
    test('TC11: Filter by price range', async ({ page }) => {

    });

    // TC12: Xem chi tiết phòng
    test('TC12: View room details', async ({ page }) => {

    });

    // TC13: Kiểm tra thông tin phòng hiển thị đầy đủ
    test('TC13: Verify complete room information display', async ({ page }) => {

    });

    // TC14: Test chức năng pagination
    test('TC14: Test pagination functionality', async ({ page }) => {
        
    });

    // TC15: Sort kết quả theo giá/đánh giá
    test('TC15: Sort results by price/rating', async ({ page }) => {

    });
});
