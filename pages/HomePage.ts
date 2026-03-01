import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { TIMEOUTS } from '../constants';
import { Helper } from '../utils/helper';

export class HomePage extends BasePage {
    readonly userMenuButton: Locator;
    readonly loginButton: Locator;
    readonly registerButton: Locator;
    readonly locationSelect: Locator;
    readonly checkInPicker: Locator;
    readonly searchIconButton: Locator;

    constructor(page: Page) {
        super(page);

        this.userMenuButton = page.locator("button:has(img[src*='6596121.png'])")
            .or(page.locator('nav button').filter({ has: page.locator('img') }).first());

        this.registerButton = page.getByRole('button', { name: 'Đăng ký' });
        this.loginButton = page.getByRole('button', { name: 'Đăng nhập' });

        this.locationSelect = page.locator("div.cursor-pointer:has-text('Địa điểm')");
        this.checkInPicker = page.locator("//*[@id='root']/div[2]/div[1]/div[3]");
        this.searchIconButton = page.locator("//*[@id='root']/div[2]/div[1]/div[5]/div");
    }

    async goto(timeout: number = 60_000): Promise<void> {
        await this.page.goto('/', { timeout, waitUntil: 'load' });
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickUserMenu(): Promise<void> {
        await this.userMenuButton.first().waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
        await this.userMenuButton.first().click();
        await this.loginButton.waitFor({ state: 'visible', timeout: TIMEOUTS.SHORT });
    }

    async clickDangKyButton(): Promise<void> {
        await this.registerButton.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
        await this.registerButton.click();
        await this.page.locator('.ant-modal-content').waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
        await this.loginButton.click();
    }

    async selectLocation(location: string): Promise<void> {
        await this.locationSelect.click();

        const locationOption = this.page.getByText(location, { exact: true }).first();
        await locationOption.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
        await locationOption.click();
    }

    async selectCheckInOutDate(checkIn: string, checkOut: string): Promise<void> {
        await this.checkInPicker.click();

        const checkInDay = Helper.getDay(checkIn);
        const checkOutDay = Helper.getDay(checkOut);

        const [, monthNum, year] = checkIn.split('/');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthLabel = `${monthNames[Number(monthNum) - 1]} ${year}`;

        const targetMonth = this.page
            .locator('.rdrMonth')
            .filter({ hasText: monthLabel });

        await targetMonth.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });

        await targetMonth
            .locator('.rdrDay')
            .filter({ hasNot: this.page.locator('.rdrDayDisabled') })
            .getByText(checkInDay, { exact: true })
            .first()
            .click();

        await targetMonth
            .locator('.rdrDay')
            .filter({ hasNot: this.page.locator('.rdrDayDisabled') })
            .getByText(checkOutDay, { exact: true })
            .first()
            .click();
    }

    async clickSearchIconButton(): Promise<void> {
        await this.searchIconButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}
