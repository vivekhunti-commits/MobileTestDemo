import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: true,
  retries: 1,
  reporter: [['html', { open: 'never' }], ['list'], ['github']],
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'samsung-galaxy-note-3',
      use: {
        ...devices['Galaxy Note 3'],
      },
    },
  ],
});
