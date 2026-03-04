export const BASE_URL = process.env.BASE_URL!;

export const TEST_USER = {
    email: process.env.TEST_USER_EMAIL!,
    password: process.env.TEST_USER_PASSWORD!,
};

export const TIMEOUTS = {
    SHORT: 3_000,
    MEDIUM: 5_000,
    LONG: 10_000,
    PAGE_LOAD: 15_000,
    API: 10_000,
};

export const UI_TEXTS = {
    LOGIN_HEADING: 'Đăng nhập',
    REGISTER_HEADING: 'Đăng ký tài khoản',
    LOGIN_BTN: 'Đăng nhập',
    REGISTER_BTN: 'Đăng ký',
    CLOSE_BTN: 'Close',
    EMAIL_PLACEHOLDER: 'Vui lòng nhập tài khoản',
    PASSWORD_PLACEHOLDER: 'Vui lòng nhập mật khẩu',
};
