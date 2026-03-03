import { Page, Locator } from '@playwright/test';
import { Helper } from '../utils/helper';

export class RoomDetailsPage {
    readonly page: Page;

    readonly roomTitle: Locator;
    readonly roomDescription: Locator;
    readonly roomLocation: Locator;
    readonly roomIMG: Locator;
    readonly price : Locator;
    readonly numberGuest: Locator;
    readonly formBooking: Locator;
    readonly roomUtilities: Locator;
    readonly formComment: Locator;
    readonly commentsList: Locator;
    readonly loginRequiredAlert: Locator;

    constructor(page: Page) {
        this.page = page;
        // <h2 class=" font-bold text-3xl pt-4"> NewApt D1 - Cozy studio - NU apt - 500m Bui Vien!</h2>
        this.roomTitle = page.locator("//*[@id='root']/div[2]/h2");

        this.roomLocation = page.locator("//*[@id='root']/div[2]/div[1]");

        this.roomDescription = page.locator("//*[@id='root']/div[2]/div[3]/div[1]");
        
        this.roomIMG = page.locator("//*[@id='root']/div[2]/div[2]/div");
        
        this.formBooking = page.locator("//*[@id='root']/div[2]/div[3]/div[3]/div");

        this.roomUtilities = page.locator("//*[@id='root']/div[2]/div[4]").or(page.locator("div.space-y-6:has-text('Các tiện ích đi kèm')"));

        this.price = page.locator("//*[@id='root']/div[2]/div[3]/div[3]/div/div[1]/div[1]");
        
        // Select number of guests field (the input/display area with border, not the label)
        this.numberGuest = page.locator("//*[@id='root']/div[2]/div[3]/div[3]/div/div[2]/div[2]").first();

        this.formComment = page.locator("//*[@id='root']/div[2]/form/div/div[1]")

        this.commentsList = page.locator("//*[@id='root']/div[2]/div[8]");

        // Alert displayed when user is not logged in to post comments
        // <div data-show="true" class="ant-alert ant-alert-warning ant-alert-no-icon css-zl9ks2" role="alert">
        //   <div class="ant-alert-content">
        //     <div class="ant-alert-message">Cần đăng nhập để bình luận</div>
        //   </div>
        // </div>
        this.loginRequiredAlert = page.locator('div.ant-alert.ant-alert-warning', { hasText: 'Cần đăng nhập để bình luận' });

    }

}