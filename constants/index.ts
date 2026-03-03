// URLs
export const BASE_URL = process.env.BASE_URL || 'https://demo5.cybersoft.edu.vn';
export const API_BASE_URL = process.env.API_BASE_URL || 'https://airbnbnew.cybersoft.edu.vn';

// CyberSoft token — required in header for every API request
export const TOKEN_CYBERSOFT =
    process.env.TOKEN_CYBERSOFT ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxMCIsIkhldEhhblN0cmluZyI6IjAxLzA1LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NjA1NzYwMDAwMCIsIm5iZiI6MTcyMTMxNDAwMCwiZXhwIjoxNzQ2MjA1MjAwfQ.huyKJMRLCe4YKDAzBU5AWy3mJBt2FNOEbeZM-EKMhCE';

// Test account — register this manually on the site first
export const TEST_USER = {
    email: process.env.TEST_USER_EMAIL || 'nguyenthikieuoanh948@gmail.com',
    password: process.env.TEST_USER_PASSWORD || 'Oanh123456',
};

// API routes
export const API_ENDPOINTS = {
    SIGN_UP: '/api/auth/signup',
    SIGN_IN: '/api/auth/signin',
    USERS: '/api/users',
    USER_BY_ID: (id: number) => `/api/users/${id}`,
    UPLOAD_AVATAR: '/api/users/upload-avatar',
    SEARCH_USER: (name: string) => `/api/users/search/${name}`,
};

// Wait times (ms)
export const TIMEOUTS = {
    SHORT: 3_000,
    MEDIUM: 5_000,
    LONG: 10_000,
    PAGE_LOAD: 15_000,
    API: 10_000,
};

// UI labels (Vietnamese)
export const UI_TEXTS = {
    LOGIN_HEADING: 'Đăng nhập',
    REGISTER_HEADING: 'Đăng ký tài khoản',
    LOGIN_BTN: 'Đăng nhập',
    REGISTER_BTN: 'Đăng ký',
    CLOSE_BTN: 'Close',
    EMAIL_PLACEHOLDER: 'Vui lòng nhập tài khoản',
    PASSWORD_PLACEHOLDER: 'Vui lòng nhập mật khẩu',
};
