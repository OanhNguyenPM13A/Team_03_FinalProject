import { Page, Locator } from '@playwright/test';
import { time } from 'node:console';

export class RegisterModal {
    readonly page: Page;

    readonly nameInput!: Locator;
    readonly emailInput!: Locator;
    readonly passwordInput!: Locator;
    readonly phoneInput!: Locator;
    readonly birthdayInput!: Locator;
    readonly genderSelect!: Locator;
    readonly submitButton!: Locator;
    readonly closeButton!: Locator;
    readonly modal: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modal = page.locator(".ant-modal-content")

        this.nameInput = page.locator("input#name").or(page.getByRole("textbox", { name: "name" }));
        this.emailInput = page.locator("input#email").or(page.getByRole("textbox", { name: "email" }));
        this.passwordInput = page.locator("input#password").or(page.getByRole("textbox", { name: "password" }));
        this.phoneInput = page.locator("input#phone").or(page.getByRole("textbox", { name: "phone" }));
        this.birthdayInput = page.locator("input#birthday").or(page.getByRole("textbox", { name: "birthday" }));
        this.genderSelect = page.locator("div.ant-select[name='gender']");

    }
    // Step4: Wait for model appear
    async waitForModal(timeout: number = 60000): Promise<void> {
        await this.modal.waitFor({ state: 'visible', timeout });
    }
    // Step5: Fill register data
    async fillRegisterData(
        name?: string,
        email?: string,
        password?: string,
        phone?: string
    ): Promise<void> {
        name && await this.nameInput.fill(name);
        email && await this.emailInput.fill(email);
        password && await this.passwordInput.fill(password);
        phone && await this.phoneInput.fill(phone);
        await this.page.waitForTimeout(1000);
    }

    async selectBirthday(date: string): Promise<void> {
        // Click to open birthday picker
        await this.birthdayInput.click();
        await this.page.waitForTimeout(500);
        
        // Type date into the input (DatePicker will handle the formatting)
        await this.page.keyboard.type(date);
        await this.page.waitForTimeout(500);
        
        // Press Enter to confirm
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);
    }

    async selectGender(gender: string   ): Promise<void> {
        // Select Gender
        await this.genderSelect.click();
        await this.page.waitForTimeout(500);

        const genderOption = this.page.locator(".ant-select-item");

        if(gender === "Nam")
            await genderOption.nth(0).click(); // Select the first option (Nam)
        else{
            await genderOption.nth(1).click(); // Select the second option (Nữ)    
        }
        
        await this.page.waitForTimeout(1000);
    }   
}