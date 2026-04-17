import { Page, Locator } from '@playwright/test';
import { Helper } from '../utils/helper';

export class RoomDetailsPage {
    readonly page: Page;

    readonly roomTitle: Locator;
    readonly roomLocation: Locator;
    readonly roomIMG: Locator;
    readonly roomHost: Locator;
    readonly roomType : Locator;
    readonly numberRooms : Locator
    readonly numberBed : Locator;
    readonly price : Locator;
    readonly numberGuest: Locator;
    readonly formBooking: Locator;
    readonly roomUtilities: Locator;
    readonly formComment: Locator;
    readonly commentsList: Locator;
    readonly loginRequiredAlert: Locator;
    readonly translationBox : Locator

    constructor(page: Page) {
        this.page = page;
        // <h2 class=" font-bold text-3xl pt-4"> NewApt D1 - Cozy studio - NU apt - 500m Bui Vien!</h2>
        this.roomTitle = page.locator("//*[@id='root']/div[2]/h2");

        this.roomLocation = page.locator('text=Hồ Chí Minh, Việt Nam');
        
        this.roomIMG = page.locator("//*[@id='root']/div[2]/div[2]/div");

        this.roomHost = page.locator('text=Toàn bộ căn hộ');

        this.numberGuest = page.locator('text=3 Khách');
        
        this.roomType = page.locator('text=Phòng Studio');

        this.numberRooms = page.locator('text=1 Phòng ngủ');

        this.numberBed = page.locator('text=1 giường');

        this.formBooking = page.locator("//*[@id='root']/div[2]/div[3]/div[3]/div");

        this.roomUtilities = page.locator("//*[@id='root']/div[2]/div[4]").or(page.locator("div.space-y-6:has-text('Các tiện ích đi kèm')"));

        this.price = page.locator("//*[@id='root']/div[2]/div[3]/div[3]/div/div[1]/div[1]");
        
        // this.numberGuest = page.locator("//*[@id='root']/div[2]/div[3]/div[3]/div/div[2]/div[2]").first();

        this.formComment = page.locator("//*[@id='root']/div[2]/form/div/div[1]")

        this.commentsList = page.locator("//*[@id='root']/div[2]/div[8]");

        // Alert displayed when user is not logged in to post comments
        // <div data-show="true" class="ant-alert ant-alert-warning ant-alert-no-icon css-zl9ks2" role="alert">
        //   <div class="ant-alert-content">
        //     <div class="ant-alert-message">Cần đăng nhập để bình luận</div>
        //   </div>
        // </div>
        this.loginRequiredAlert = page.locator('div.ant-alert.ant-alert-warning', { hasText: 'Cần đăng nhập để bình luận' });
        this.translationBox = page.locator('text=Dịch sang tiếng Anh');

    }

}