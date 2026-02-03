import {Page, Locator} from '@playwright/test';

export class HomePage { 
    readonly page: Page;

    readonly userMenuButton: Locator;
    readonly loginButton: Locator;
    readonly registerButton: Locator;

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
        this.registerButton = page.getByRole("button", {name: "Đăng ký"})
                            .or(page.locator("li.py-2:has-text('Đăng ký')"));
        
        this.loginButton = page.getByRole("button", {name: "Đăng nhập"})
                            .or(page.locator("li.py-2:has-text('Đăng nhập')"));
    }

    // Step1: Access website
    async goto(timeout: number = 60000): Promise<void> {
        await this.page.goto('https://demo5.cybersoft.edu.vn', {timeout, waitUntil: 'load'});
        // await this.page.goto('https://demo5.cybersoft.edu.vn', {timeout, waitUntil: 'networkidle'});
    }

    // Step2: Click User Menu
    async clickUserMenu(): Promise<void> {
        await this.userMenuButton.waitFor({state: 'visible', timeout: 6000})
        await this.userMenuButton.click();
        await this.page.waitForTimeout(2000);
    }

    // Step3.1: Click Register Button
    async clickDangKyButton(): Promise<void> {
        await this.registerButton.waitFor({state: 'visible', timeout: 6000})
        await this.registerButton.click();

        await this.page.waitForTimeout(2000);
    }

    // Step3.2: Click Login Button
    async clickLoginButton(): Promise<void> {
        await this.loginButton.waitFor({state: 'visible', timeout: 6000})
        await this.loginButton.click();
    }
}