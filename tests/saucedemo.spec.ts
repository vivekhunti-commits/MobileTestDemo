import { test } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';

const password = 'secret_sauce';

test.describe('SauceDemo mobile scenarios', () => {
  test('places an order successfully', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.open();
    await login.login('standard_user', password);
    await inventory.expectLoaded();

    await inventory.addBackpackToCart();
    await inventory.openCart();
    await cart.expectBackpackPresent();
    await cart.checkout();

    await checkout.enterCustomerDetails('John', 'Doe', '560001');
    await checkout.continue();
    await checkout.finish();
    await checkout.expectOrderComplete();
  });

  test('rejects an invalid password', async ({ page }) => {
    const login = new LoginPage(page);

    await login.open();
    await login.login('standard_user', 'incorrect-password');
    await login.expectError('Username and password do not match');
  });

  test('shows an error for a locked-out user', async ({ page }) => {
    const login = new LoginPage(page);

    await login.open();
    await login.login('locked_out_user', password);
    await login.expectError('Sorry, this user has been locked out');
  });

  test('requires customer information during checkout', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.open();
    await login.login('standard_user', password);
    await inventory.expectLoaded();
    await inventory.addBackpackToCart();
    await inventory.openCart();
    await cart.checkout();

    await checkout.continue();
    await checkout.expectError('First Name is required');
  });
});
