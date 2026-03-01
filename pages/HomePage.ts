import { Page, Locator } from '@playwright/test';
import { Helper } from '../utils/helper';

export class HomePage {
    readonly page: Page;

    readonly userMenuButton: Locator;
    readonly loginButton: Locator;
    readonly registerButton: Locator;
    readonly locationSelect: Locator;
    readonly checkInPicker: Locator;
    readonly searchIconButton: Locator;
    readonly guestSelect: Locator;

    constructor(page: Page) {
        this.page = page;

        // <button 
        //     class=" text-sm bg-main rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 font-bold duration-300 hover:scale-105 hover:bg-white hover:text-white"
        // >
        //     <img
        //         class="h-10"
        //         src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
        //     >
        // </button>
        this.userMenuButton = page.locator("button:has(img[src*='6596121.png'])")
            .or(page.locator("button.bg-main.rounded-full:has(img)"));

        // <li>
        //     <button
        //         class="block text-center px-5 w-full rounded py-2 text-sm text-gray-700 hover:bg-gray-300 "
        //         >Đăng ký
        //     </button>
        // </li>
        this.registerButton = page.getByRole("button", { name: "Đăng ký" })
            .or(page.locator("li.py-2:has-text('Đăng ký')"));

        this.loginButton = page.getByRole("button", { name: "Đăng nhập" })
            .or(page.locator("li.py-2:has-text('Đăng nhập')"));


        // <div class="col-span-3  flex-1 px-6 py-3 flex flex-col justify-center items-center cursor-pointer " >
        //     <p class="text-sm" > Địa điểm </p>
        //     < p class="text-sm font-bold" > Hồ Chí Minh </p>
        //     < div class="smm:border-b md:hidden smm:border-gray-400 smm:w-9/12 py-2" ></div>
        // </div>

        this.locationSelect = page.locator("div.cursor-pointer:has-text('Địa điểm')");

        //*[@id="root"]/div[2]/div[1]/div[3]
        this.checkInPicker = page.locator("//*[@id='root']/div[2]/div[1]/div[3]");

        this.searchIconButton = page.locator("//*[@id='root']/div[2]/div[1]/div[5]/div");

        // <div class="z-10 absolute w-[300px] top-[70px] right-0 bg-white rounded-full px-6 py-3 border-2 border-gray-300 overflow-y-auto overscroll-y-auto cursor-auto flex justify-between items-center">
        //     <div class="text-md">Khách</div>
        //     <div class="flex justify-between items-center gap-3">
        //         <button class="font-bold w-6 h-6 text-white bg-[#FF5A5F] hover:bg-[#9e3e4e] rounded-full duration-300 flex items-center justify-center cursor-not-allowed opacity-50" disabled="">
        //             <div>-</div>
        //         </button>
        //         <div class="text-md">1</div>
        //         <button class="font-bold w-6 h-6 text-white bg-[#FF5A5F] hover:bg-[#9e3e4e] rounded-full duration-300 flex items-center justify-center">
        //             <div>+</div>
        //         </button>
        //     </div>
        // </div>
        this.guestSelect = page.locator("div.cursor-pointer:has-text('Khách')");
    }

    // Step1: Access website
    async goto(timeout: number = 60000): Promise<void> {
        await this.page.goto('https://demo5.cybersoft.edu.vn', { timeout, waitUntil: 'load' });
        // await this.page.goto('https://demo5.cybersoft.edu.vn', {timeout, waitUntil: 'networkidle'});
    }

    // Step2: Click User Menu
    async clickUserMenu(): Promise<void> {
        await this.userMenuButton.waitFor({ state: 'visible', timeout: 6000 })
        await this.userMenuButton.click();
        await this.page.waitForTimeout(2000);
    }

    // Step3.1: Click Register Button
    async clickDangKyButton(): Promise<void> {
        await this.registerButton.waitFor({ state: 'visible', timeout: 6000 })
        await this.registerButton.click();

        await this.page.waitForTimeout(2000);
    }

    // Step3.2: Click Login Button
    async clickLoginButton(): Promise<void> {
        await this.loginButton.waitFor({ state: 'visible', timeout: 6000 })
        await this.loginButton.click();
    }

    //Step4.1: Select location
    async selectLocation(location: string): Promise<void> {
        await this.locationSelect.click();
        await this.page.waitForTimeout(2000);
        //*[@id="root"]/div[2]/div[1]/div/div[2]
        let optionPath = "";
        if (location === "Hồ Chí Minh") {
            optionPath = "//*[@id='root']/div[2]/div[1]/div/div[2]/div[1]";
        } else if (location === "Hà Nội") {
            optionPath = "//*[@id='root']/div[2]/div[1]/div/div[2]/div[2]";
        } else if (location === "Cần Thơ") {
            optionPath = "//*[@id='root']/div[2]/div[1]/div/div[3]]";
        }
        await this.page.locator(optionPath).click();
        await this.page.waitForTimeout(2000);
    }

    // Step4.2: Select check-in/check-out date
    async selectCheckInOutDate(
        checkIn: string,
        checkOut: string
    ): Promise<void> {

        // 1. Open date picker
        await this.checkInPicker.click();
        await this.page.waitForTimeout(2000);

        // 2. Get day and month from date string (DD/MM/YYYY)
        const [checkInDay, checkInMonth, checkInYear] = checkIn.split('/');
        const [checkOutDay, checkOutMonth, checkOutYear] = checkOut.split('/');

        const checkInDayNum = Helper.getDay(checkIn);
        const checkOutDayNum = Helper.getDay(checkOut);
        
        // 3. Wait for date picker container to be visible
        const datePickerContainer = this.page.locator('[class*="rdrDateRangeWrapper"], [class*="rdrMonths"]').first();
        await datePickerContainer.waitFor({ state: 'visible', timeout: 8000 }).catch(() => {
            // If specific container not found, try waiting for any month element
            return this.page.locator('.rdrMonth').first().waitFor({ state: 'visible', timeout: 5000 });
        });

        await this.page.waitForTimeout(1500);

        // 4. Find the correct month container for check-in date
        // Month format expected: "Feb" for February
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const checkInMonthName = monthNames[parseInt(checkInMonth) - 1];
        const checkInYearStr = checkInYear;

        const monthContainers = this.page.locator('.rdrMonth');
        const monthCount = await monthContainers.count();

        let checkInMonthElement = null;
        for (let i = 0; i < monthCount; i++) {
            const monthText = await monthContainers.nth(i).textContent();
            if (monthText?.includes(checkInMonthName) && monthText?.includes(checkInYearStr)) {
                checkInMonthElement = monthContainers.nth(i);
                break;
            }
        }

        if (!checkInMonthElement) {
            throw new Error(`Could not find month ${checkInMonthName} ${checkInYearStr} in date picker`);
        }

        // 5. Click check-in day
        try {
            await checkInMonthElement
                .locator('.rdrDay')
                .getByText(checkInDayNum, { exact: true })
                .first()
                .click({ timeout: 5000 });
        } catch (error) {
            throw new Error(`Failed to select check-in date: ${checkIn}`);
        }

        await this.page.waitForTimeout(1000);

        // 6. Find month element for check-out date (might be same or different month)
        const checkOutMonthName = monthNames[parseInt(checkOutMonth) - 1];
        const checkOutYearStr = checkOutYear;

        let checkOutMonthElement = null;
        for (let i = 0; i < monthCount; i++) {
            const monthText = await monthContainers.nth(i).textContent();
            if (monthText?.includes(checkOutMonthName) && monthText?.includes(checkOutYearStr)) {
                checkOutMonthElement = monthContainers.nth(i);
                break;
            }
        }

        if (!checkOutMonthElement) {
            throw new Error(`Could not find month ${checkOutMonthName} ${checkOutYearStr} in date picker`);
        }

        // 7. Click check-out day
        try {
            await checkOutMonthElement
                .locator('.rdrDay')
                .getByText(checkOutDayNum, { exact: true })
                .first()
                .click({ timeout: 5000 });
        } catch (error) {
            throw new Error(`Failed to select check-out date: ${checkOut}`);
        }
        
        await this.page.waitForTimeout(2000);
    }

    // Step4.3: Select number of guests
    async selectGuests(numGuests: number): Promise<void> {
        await this.guestSelect.click();
        await this.page.waitForTimeout(2000);

        const plusButton = this.page.locator("button:has-text('+')");
        for (let i = 1; i < numGuests; i++) {
            await plusButton.click();
            await this.page.waitForTimeout(1000);
        }
    }
    
    // Step5: Click Search Icon Button
    async clickSearchIconButton(): Promise<void> {
        await this.searchIconButton.first().click();
        await this.page.waitForTimeout(6000);
    }

    // Step6: Scroll down to view results
    async scrollDown(pixels: number = 300): Promise<void> {
        await this.page.evaluate((scrollAmount) => {
            window.scrollBy(0, scrollAmount);
        }, pixels);
        await this.page.waitForTimeout(2000);
    }

}