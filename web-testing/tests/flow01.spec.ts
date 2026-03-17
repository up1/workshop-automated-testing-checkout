import { test, expect } from '@playwright/test';

test('Flow checkout success with 1 product, quantity=1', async ({ page }) => {
  await page.goto('http://localhost:5173/product');
  await page.getByText('Product CatalogShowing 8 productsSort by:FeaturedElectronicsWireless Headphones').click();
  await page.getByRole('button', { name: 'Add' }).first().click();
  await expect(page.getByRole('link', { name: '1' })).toBeVisible();
  await page.getByRole('link', { name: '1' }).click();
  await expect(page.locator('body')).toContainText('Wireless Headphones Pro');
  await page.getByRole('heading', { name: 'Shopping Cart' }).click();
  await expect(page.locator('h1')).toContainText('Shopping Cart');
  await expect(page.locator('h2')).toContainText('Order Summary');
  await expect(page.locator('body')).toContainText('$244.49');
  await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
  await page.getByRole('textbox', { name: 'Enter your full name' }).click();
  await page.getByRole('textbox', { name: 'Enter your full name' }).fill('somkiat pui');
  await page.getByRole('textbox', { name: 'you@example.com' }).click();
  await page.getByRole('textbox', { name: 'you@example.com' }).click();
  await page.getByRole('textbox', { name: 'you@example.com' }).fill('somkiat@gmail.com');
  await page.locator('.flex.gap-4 > div:nth-child(2) > .flex').first().click();
  await page.getByRole('textbox', { name: '+1 (555) 000-' }).fill('0707070707');
  await page.getByRole('textbox', { name: 'Main Street, Apt 4B' }).click();
  await page.getByRole('textbox', { name: 'Main Street, Apt 4B' }).fill('q');
  await page.getByRole('textbox', { name: 'Main Street, Apt 4B' }).press('Tab');
  await page.getByRole('textbox', { name: 'New York' }).fill('weq');
  await page.getByRole('textbox', { name: 'Main Street, Apt 4B' }).click();
  await page.getByRole('textbox', { name: 'Main Street, Apt 4B' }).fill('qwe');
  await page.getByRole('textbox', { name: 'NY' }).click();
  await page.getByRole('textbox', { name: 'NY' }).fill('aaa');
  await page.getByRole('textbox', { name: '10001' }).click();
  await page.getByRole('textbox', { name: '10001' }).fill('10100');
  await page.getByRole('textbox', { name: '5678 9012 3456' }).click();
  await page.getByRole('textbox', { name: '5678 9012 3456' }).fill('1111111111111111');
  await page.getByRole('textbox', { name: 'MM / YY' }).click();
  await page.getByRole('textbox', { name: 'MM / YY' }).fill('11/11');
  await page.getByRole('textbox', { name: '123', exact: true }).click();
  await page.getByRole('textbox', { name: '123', exact: true }).fill('111');
  await page.getByRole('textbox', { name: 'Name on card' }).click();
  await page.getByRole('textbox', { name: 'Name on card' }).fill('demo name');
  await page.getByRole('button', { name: 'Complete Order' }).click();

  // Wait for the order confirmation page to load
  await page.waitForSelector('h1');
  await expect(page.getByRole('heading')).toContainText('Order Confirmed!');
  await expect(page.locator('body')).toContainText('$281.99');
});
