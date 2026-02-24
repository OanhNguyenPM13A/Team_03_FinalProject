import { test as setup } from '@playwright/test';
import { HeaderComponent } from '../pages/HeaderComponent';
import { LoginPopup } from '../pages/LoginPopup';
import { TEST_USER } from '../constants';
import path from 'path';

const STORAGE_STATE = path.join(__dirname, '../../playwright/.auth/user.json');

// Logs in and saves browser state for tests that need an authenticated session
setup('authenticate test user', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const header = new HeaderComponent(page);
    const loginPopup = new LoginPopup(page);

    await header.openLoginPopup();
    await loginPopup.login(TEST_USER.email, TEST_USER.password);

    // Wait for the success toast
    await page.getByText('Đăng nhập thành công').waitFor({ state: 'visible', timeout: 10_000 });

    await page.context().storageState({ path: STORAGE_STATE });
});
