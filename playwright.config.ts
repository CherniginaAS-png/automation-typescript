import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Максимальное время выполнения одного теста — 7 секунд */
  timeout: 7000,
  expect: {
    /* Максимальное время ожидания для проверок expect — 4 секунды */
    timeout: 4000
  },
  /* Количество перезапусков при падении */
  retries: 2,
  /* Запуск тестов параллельно */
  fullyParallel: true,
  /* Репортер для вывода результатов */
  reporter: 'html',
  
  use: {
    /* Базовый URL тестируемого сайта */
    baseURL: 'http://localhost:3000',
    /* Собирать трассировку при первом ретрае */
    trace: 'on-first-retry',
  },

  /* Настройка запуска в браузере Chromium (Chrome) */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
     /* Настройка автоматического запуска локального сервера перед тестами */
  webServer: {
    command: 'node server.js',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 10 * 1000,
  }, 
});