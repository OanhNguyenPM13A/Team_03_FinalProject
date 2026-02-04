import {Page, Locator} from '@playwright/test';

export class HomePage { 
    readonly page: Page;

    readonly userMenuButton: Locator;
    readonly loginButton: Locator;
    readonly registerButton: Locator;
    readonly locationSelect: Locator;
    readonly searchIconButton: Locator;

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

        
        // <div class="col-span-3  flex-1 px-6 py-3 flex flex-col justify-center items-center cursor-pointer " >
        //     <p class="text-sm" > Địa điểm </p>
        //     < p class="text-sm font-bold" > Hồ Chí Minh </p>
        //     < div class="smm:border-b md:hidden smm:border-gray-400 smm:w-9/12 py-2" ></div>
        // </div>

        this.locationSelect = page.locator("div.cursor-pointer:has-text('Địa điểm')");

        this.searchIconButton = page.locator("//*[@id='root']/div[2]/div[1]/div[5]/div");
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

    //Step4: Select location
    async selectLocation(location: string): Promise<void> {
        await this.locationSelect.click();
        await this.page.waitForTimeout(2000);
        //*[@id="root"]/div[2]/div[1]/div/div[2]
        let optionPath = "";
        if(location === "Hồ Chí Minh"){
            optionPath = "//*[@id='root']/div[2]/div[1]/div/div[2]/div[1]";
        }else if(location === "Hà Nội"){
            optionPath = "//*[@id='root']/div[2]/div[1]/div/div[2]/div[2]";
        }else if(location === "Cần Thơ"){
            optionPath = "//*[@id='root']/div[2]/div[1]/div/div[3]]";
        } 
        await this.page.locator(optionPath).click();
        await this.page.waitForTimeout(2000);
    }

    // Step5: Click Search Icon Button
    async clickSearchIconButton(): Promise<void> {
        await this.searchIconButton.click();
        await this.page.waitForTimeout(2000);
    }
    
}