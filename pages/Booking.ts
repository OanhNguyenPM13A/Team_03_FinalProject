import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class Booking extends BasePage {
    // Main booking container
    readonly bookingForm: Locator;

    // Price section
    readonly pricePerNight: Locator;

    // Check-in/Check-out date inputs
    readonly checkInInput: Locator;
    readonly checkOutInput: Locator;
    readonly checkInDateText: Locator;
    readonly checkOutDateText: Locator;
    // Rating section
    readonly ratingStars: Locator;
    readonly ratingScore: Locator;
    readonly reviewCount: Locator;

    // Guest selector
    readonly guestCount: Locator;
    readonly decreaseGuestBtn: Locator;
    readonly increaseGuestBtn: Locator;

    // Booking button
    readonly bookingBtn: Locator;

    // Price breakdown
    readonly priceBreakdownLine: Locator;
    readonly cleaningFeeValue: Locator;
    readonly totalBeforeTaxes: Locator;
    readonly totalBeforeTaxesValue: Locator;

    // Booking alert (when user not logged in)
    readonly bookingAlert: Locator;

    constructor(page: Page) {
        super(page);

        // Main booking container - sticky box with border and shadow
        this.bookingForm = page.locator('div.basis-4\\/12.sticky').first();

        // Price per night - bold text with $ and /night
        this.pricePerNight = this.bookingForm.locator('span.font-bold').first();

        // Check-in/Check-out inputs
        this.checkInInput = this.bookingForm.locator('div.cursor-pointer').filter({ hasText: 'Nhận phòng' }).first();
        this.checkOutInput = this.bookingForm.locator('div.cursor-pointer').filter({ hasText: 'Trả phòng' }).first();
        this.checkInDateText = this.checkInInput.locator('div').nth(1);
        this.checkOutDateText = this.checkOutInput.locator('div').nth(1);

        // Rating section - scoped to booking form to avoid strict mode violation
        this.ratingStars = this.bookingForm.locator('[role="img"][aria-label="star"]').first();
        this.ratingScore = this.bookingForm.locator('span.font-bold').nth(1);
        this.reviewCount = this.bookingForm.locator('span.underline.cursor-pointer').first();

        // Guest selector - target the middle div in flex container with guest count text
        this.guestCount = this.bookingForm.locator('div.flex.justify-between.items-center').locator('div').nth(1);
        this.decreaseGuestBtn = this.bookingForm.locator('button').filter({ hasText: '–' }).first();
        this.increaseGuestBtn = this.bookingForm.locator('button').filter({ hasText: '+' }).first();

        // Booking button - "Đặt phòng"
        this.bookingBtn = this.bookingForm.locator('button.bg-main').filter({ hasText: 'Đặt phòng' });

        // Price breakdown
        this.priceBreakdownLine = this.bookingForm.locator('p.underline');
        this.cleaningFeeValue = this.bookingForm.locator('p').filter({ hasText: 'Cleaning fee' }).locator('..').locator('p').last();
        this.totalBeforeTaxes = this.bookingForm.locator('p').filter({ hasText: 'Total before taxes' });
        this.totalBeforeTaxesValue = this.totalBeforeTaxes.locator('..').locator('p').last();

        // Booking alert - warning notification when user not logged in
        this.bookingAlert = page.locator('div.ant-notification-notice-wrapper')
            .filter({ has: page.locator('div.ant-notification-notice-description', { hasText: 'Vui lòng đăng nhập để tiếp tục đặt phòng' }) })
            .first();
    }

    // Check if booking form is visible
    async isBookingFormVisible(): Promise<boolean> {
        return this.bookingForm.isVisible();
    }

    // Get price per night
    async getPricePerNight(): Promise<string> {
        const price = (await this.pricePerNight.innerText())?.trim();
        if (!price) throw new Error('Price per night is not displayed');
        return price;
    }

    // // Get rating score
    async getRatingScore(): Promise<string> {
        const score = await this.ratingScore.textContent();
        return score?.trim() || '';
    }

    // // Get review count
    async getReviewCount(): Promise<string> {
        const text = await this.reviewCount.textContent();
        // Extract number from format like "(229) đánh giá"
        const match = text?.match(/\((\d+)\)/);
        return match ? match[1] : '';
    }

    // Get check-in date text
    async getCheckInDate(): Promise<string> {
        const date = (await this.checkInDateText.textContent())?.trim() || '';
        if (!date) throw new Error('Check-in date not found');
        return date;
    }

    //Get check-out date text
    async getCheckOutDate(): Promise<string> {
        const date = (await this.checkOutDateText.textContent())?.trim() || '';
        if (!date) throw new Error('Check-out date not found');
        return date;
    }

    // Get guest count - extract number from 'X khách' format
    async getGuestCount(): Promise<string> {
        const text = await this.guestCount.textContent();
        // Match pattern like '1 khách' or '2 khách' and extract just the number
        const match = text?.trim().match(/^(\d+)/);
        return match ? match[1] : '';
    }

    // Decrease guest count
    async decreaseGuest(): Promise<void> {
        await this.decreaseGuestBtn.click();
        await this.page.waitForTimeout(500);
    }

    // Increase guest count
    async increaseGuest(): Promise<void> {
        await this.increaseGuestBtn.click();
        await this.page.waitForTimeout(500);
    }

    // Click booking button
    async clickBooking(): Promise<void> {
        await this.bookingBtn.click();
        await this.page.waitForTimeout(2000);
    }

    // Get price breakdown (price x nights)
    async getPriceBreakdown(): Promise<string> {
        return ((await this.priceBreakdownLine.first().innerText()) ?? '').trim();
    }
    // Get cleaning fee
    async getCleaningFee(): Promise<string> {
        return ((await this.cleaningFeeValue.innerText()) ?? '').trim();
    }

    // Get total before taxes
    async getTotalBeforeTaxes(): Promise<string> {
        return ((await this.totalBeforeTaxesValue.innerText()) ?? '').trim();
    }

    // Check if booking alert (login required) is visible
    async isBookingAlertVisible(): Promise<boolean> {
        return this.bookingAlert.isVisible().catch(() => false);
    }

    // Get booking alert message
    async getBookingAlertMessage(): Promise<string> {
        const text = await this.bookingAlert.locator('div.ant-notification-notice-description').textContent();
        return text?.trim() || '';
    }

    async clickCheckInDateInput(): Promise<void> {
        await this.checkInInput.click();
        await this.page.waitForTimeout(2000);
    }

}