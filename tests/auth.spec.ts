import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Тестирование авторизации на SauceDemo', () => {

    // 1. Позитивный тест
    test('Успешная авторизация', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(page.locator("[data-test='title']")).toHaveText('Products');
    });

    // 2. Негативный сценарий с параметризацией (Data-Driven Testing)
    const testCases = [
        { user: 'locked_out_user', pass: 'secret_sauce', error: 'Epic sadface: Sorry, this user has been locked out.' },
        { user: 'invalid_user', pass: 'wrong_password', error: 'Epic sadface: Username and password do not match any user in this service' },
        { user: '', pass: 'secret_sauce', error: 'Epic sadface: Username is required' }
    ];

    for (const data of testCases) {
        test(`Неуспешная авторизация пользователя: ${data.user}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.navigate();
            await loginPage.login(data.user, data.pass);

            const errorMessage = page.locator("[data-test='error']");
            await expect(errorMessage).toContainText(data.error);
        });
    }
});