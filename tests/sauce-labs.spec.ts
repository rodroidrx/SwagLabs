import { test, expect } from '@playwright/test';
import { getFakeUser } from './utils/fakeUser';

test('Homepage', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);

});

test('User Login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);

  // Click the get started link.
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();

  // Expects page to have a heading with the name of Products.
  await expect(page.locator('[data-test="title"]')).toBeVisible();

});

test('Product Browsing and Filtering', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Click the get started link.
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();

  // Expects page to have a heading with the name of Products.
  await expect(page.locator('[data-test="title"]')).toBeVisible();

  await page.locator('[data-test="product-sort-container"]').click();

  // Click on the sort dropdown and select Z-A sorting option
  await page.locator('[data-test="product-sort-container"]').selectOption('za');
  console.log(await page.locator("//*[@id='inventory_container']/div/div[1]/div[2]/div[1]/a/div").innerText());
  await expect(page.locator("//*[@id='inventory_container']/div/div[1]/div[2]/div[1]/a/div")).toHaveText("Test.allTheThings() T-Shirt (Red)");

  // Click on the sort dropdown and select A-Z sorting option
  await page.locator('[data-test="product-sort-container"]').selectOption('az');
  console.log(await page.locator("//*[@id='inventory_container']/div/div[1]/div[2]/div[1]/a/div").innerText());
  await expect(page.locator("//*[@id='inventory_container']/div/div[1]/div[2]/div[1]/a/div")).toHaveText("Sauce Labs Backpack");

  // Click on the sort dropdown and select Price (low to high) sorting option
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  await expect(page.locator("//*[@id='inventory_container']/div/div[1]/div[2]/div[2]/div[1]")).toHaveText("$7.99");

  // Click on the sort dropdown and select Price (high to low) sorting option
  await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
  await expect(page.locator("//*[@id='inventory_container']/div/div[1]/div[2]/div[2]/div[1]")).toHaveText("$49.99");

  // Click on an item to view its details
  await page.locator('[data-test="item-4-title-link"]').click();
  // Expects page to have a heading with the name of the product 
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack");
  await page.locator('[data-test="back-to-products"]').click();

});

test('Add Remove Items to Cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Click the get started link.
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();

  // Expects shopping cart to have 1 item after adding an item
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator("//*[@id='shopping_cart_container']/a/span").isVisible();
  await expect(page.locator("//*[@id='shopping_cart_container']/a/span")).toHaveText("1");
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

  // Expects shopping cart to have 3 items after adding multiple items
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator("//*[@id='shopping_cart_container']/a/span").isVisible();
  await expect(page.locator("//*[@id='shopping_cart_container']/a/span")).toHaveText("3");

  // Expects shopping cart to be empty after removing all items
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
  await expect(page.locator("//*[@id='shopping_cart_container']/a/span")).toBeHidden();

  // Expects shopping cart to have 1 item after adding an item
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator("//*[@id='shopping_cart_container']/a/span").isVisible();
  await expect(page.locator("//*[@id='shopping_cart_container']/a/span")).toHaveText("1");
  await page.locator('[data-test="item-4-title-link"]').click();
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack");
  await expect(page.locator("//*[@id='shopping_cart_container']/a/span")).toHaveText("1");
  await page.locator('[data-test="back-to-products"]').click();
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

});

test('Cart Management', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();


  // Expects cart to be empty initially
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator("//*[@id='cart_contents_container']/div/div[1]/div[3]")).toBeHidden();
  await page.locator('[data-test="continue-shopping"]').click();

  // Expects carts to have 3 items after adding multiple items
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator("//*[@id='cart_contents_container']/div/div[1]/div[3]")).toBeVisible();
  await expect(page.locator('[data-test="item-4-title-link"]')).toHaveText("Sauce Labs Backpack");
  await expect(page.locator('[data-test="item-0-title-link"]')).toHaveText("Sauce Labs Bike Light");
  await expect(page.locator('[data-test="item-1-title-link"]')).toHaveText("Sauce Labs Bolt T-Shirt");


  // Remove two items from the cart
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
  // Expects cart to have 1 item after removing two items
  await expect(page.locator("//*[@id='cart_contents_container']/div/div[1]/div[3]")).toBeVisible();
  await expect(page.locator('[data-test="item-4-title-link"]')).toHaveText("Sauce Labs Backpack");
  await expect(page.locator('[data-test="item-0-title-link"]')).toBeHidden();
  await expect(page.locator('[data-test="item-1-title-link"]')).toBeHidden();

  await page.locator('[data-test="checkout"]').click();

});

test('Checkout Process', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();

  // Expects cart to be empty initially
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator("//*[@id='cart_contents_container']/div/div[1]/div[3]")).toBeHidden();
  await page.locator('[data-test="continue-shopping"]').click();

  // Expects carts to have 3 items after adding multiple items
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Expects page to have a heading with the name of Products.
  await expect(page.locator('[data-test="title"]')).toBeVisible();

  // Click on the checkout button
  await page.locator('[data-test="checkout"]').click();


  // Fill in shipping details with faker
  const fakeUser = getFakeUser();
  await page.locator('[data-test="firstName"]').fill(fakeUser.firstName);
  await page.locator('[data-test="lastName"]').fill(fakeUser.lastName);
  await page.locator('[data-test="postalCode"]').fill(fakeUser.postalCode);
  await page.locator('[data-test="continue"]').click();

  // Try checkout with empty shipping details
  await page.locator('[data-test="cancel"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="checkout-info-container"] div').filter({ hasText: 'Error: First Name is required' }).nth(2).isVisible

  // Try checkout with empty last name details
  await page.locator('[data-test="cancel"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill(fakeUser.firstName);
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="checkout-info-container"] div').filter({ hasText: 'Error: Last Name is required' }).nth(2).isVisible


  // Try checkout with empty postal code details
  await page.locator('[data-test="cancel"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill(fakeUser.firstName);
  await page.locator('[data-test="lastName"]').fill(fakeUser.lastName);
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="checkout-info-container"] div').filter({ hasText: 'Error: Last Name is required' }).nth(2).isVisible
  await page.locator('[data-test="cancel"]').click();

});

test('Logout', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Click the get started link.
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();

  // Expects page to have a heading with the name of Products.
  await expect(page.locator('[data-test="title"]')).toBeVisible();

  // Logout
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').isVisible();
  await page.locator('[data-test="logout-sidebar-link"]').click();

  // Expect to be on the login page
  //await expect(page).toHaveURL('https://www.saucedemo.com/');
});
