import { expect, Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async expectBackpackPresent(): Promise<void> {
    await expect(
      this.page
        .locator('[data-test="inventory-item"]')
        .filter({ hasText: 'Sauce Labs Backpack' }),
    ).toHaveCount(1);
  }

  async checkout(): Promise<void> {
    await this.page.locator('[data-test="checkout"]').click();
  }
}
