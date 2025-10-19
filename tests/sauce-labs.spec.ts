import { test, expect } from '@playwright/test';
import { getFakeUser } from './utils/fakeUser';
import { LoginPage } from './pages/loginPage';
import InventoryPage from './pages/inventoryPage';
import { describe } from 'node:test';


test.describe('Product Browsing and Filtering', (  ) => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
  });

  test('PBF-001: should display products on the Products page', async ({ page }) => {

    await expect(page.locator('[data-test="title"]')).toBeVisible();
    const inventoryPage = new InventoryPage(page)

    // Expects page to have a heading with the name of Products.
    await expect(page.locator('[data-test="title"]')).toHaveText("Products");
  });

  test('PBF-002: should sort products from A to Z', async ({ page }) => {
    const inventoryPage = new InventoryPage(page)
     

    await page.locator('[data-test="product-sort-container"]').click();

    // Click on the sort dropdown and select A-Z sorting option
     
    console.log(await page.locator("//*[@id='inventory_container']/div/div[1]/div[2]/div[1]/a/div").innerText());
    await expect(page.locator("//*[@id='inventory_container']/div/div[1]/div[2]/div[1]/a/div")).toHaveText("Sauce Labs Backpack");
  });

  test('PBF-003: should sort products from Z to A', async ({ page }) => {
     
    // Expects page to have a heading with the name of Products.
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    await page.locator('[data-test="product-sort-container"]').click();

    // Click on the sort dropdown and select Z-A sorting option
    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    console.log(await page.locator("//*[@id='inventory_container']/div/div[1]/div[2]/div[1]/a/div").innerText());
    await expect(page.locator("//*[@id='inventory_container']/div/div[1]/div[2]/div[1]/a/div")).toHaveText("Test.allTheThings() T-Shirt (Red)");
  });

  test ('PBF-004: should sort products by price low to high', async ({ page }) => {
     
    // Expects page to have a heading with the name of Products.
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    // Click on the sort dropdown and select Price (low to high) sorting option
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    await expect(page.locator("//*[@id='inventory_container']/div/div[1]/div[2]/div[2]/div[1]")).toHaveText("$7.99");
  });

  test ('PBF-005: should sort products by price high to low', async ({ page }) => {
     
    // Expects page to have a heading with the name of Products.
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    // Click on the sort dropdown and select Price (high to low) sorting option
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    console.log(await page.locator("//*[@id='inventory_container']/div/div[1]/div[2]/div[2]/div[1]").innerText());
    await expect(page.locator("//*[@id='inventory_container']/div/div[1]/div[2]/div[2]/div[1]")).toHaveText("$49.99");
  });

  test('PBF-006: should navigate to product details page', async ({ page }) => {
     
    // Expects page to have a heading with the name of Products.
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    // Click on an item to view its details
    await page.locator('[data-test="item-4-title-link"]').click();
    // Expects page to have a heading with the name of the product 
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack");
  });

  test('PBF-007: should navigate back to Products page from product details', async ({ page }) => {
     
    // Expects page to have a heading with the name of Products.
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    // Click on an item to view its details
    await page.locator('[data-test="item-4-title-link"]').click();
    // Expects page to have a heading with the name of the product 
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack");
    
    // Click on the back button
    await page.locator('[data-test="back-to-products"]').click();
  });

});

test.describe('Add Remove Items from Cart', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
  });


  test('ARC-001: should add an item to the cart', async ({ page }) => {
   
    // Expects page to have a heading with the name of Products.
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    // Expects shopping cart to have 1 item after adding an item
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator("//*[@id='shopping_cart_container']/a/span").isVisible();
    await expect(page.locator("//*[@id='shopping_cart_container']/a/span")).toHaveText("1");

  });

  test('ARC-002: should add multiple items to the cart', async ({ page }) => {
   
    // Expects page to have a heading with the name of Products.
    await expect(page.locator('[data-test="title"]')).toBeVisible();
    // Expects shopping cart to have 3 items after adding multiple items
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await page.locator("//*[@id='shopping_cart_container']/a/span").isVisible();
    await expect(page.locator("//*[@id='shopping_cart_container']/a/span")).toHaveText("3");
  });

  test('ARC-003: should remove item from the cart', async ({ page }) => {
    
    // Expects page to have a heading with the name of Products.  
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    // Expects shopping cart to have 1 item after adding an item
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator("//*[@id='shopping_cart_container']/a/span")).toHaveText("1");

    // Expects shopping cart to be empty after removing an item
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator("//*[@id='shopping_cart_container']/a/span")).toBeHidden();
  });

  test('ARC-004: should add to cart from product details page', async ({ page }) => {
     
    // Expects page to have a heading with the name of Products.
    await expect(page.locator('[data-test="title"]')).toBeVisible();
    
    await page.locator('[data-test="item-4-title-link"]').click();
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack");
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.locator("//*[@id='shopping_cart_container']/a/span")).toHaveText("1");

  });

  test('ARC-005: should remove an item from the product page', async ({ page }) => {
     
    // Expects page to have a heading with the name of Products.
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    await page.locator('[data-test="item-4-title-link"]').click();
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack");
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.locator("//*[@id='shopping_cart_container']/a/span")).toHaveText("1");
    await page.locator('[data-test="remove"]').click();
  });

  test('ARC-006: should navigate back to Products Page', async ({ page }) => {
     
    // Expects page to have a heading with the name of Products.
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    await page.locator('[data-test="item-4-title-link"]').click();
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack");
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.locator("//*[@id='shopping_cart_container']/a/span")).toHaveText("1");
    await page.locator('[data-test="back-to-products"]').click();
    await expect(page.locator('[data-test="title"]')).toBeVisible();
  });

});

test.describe('Cart Management', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
  });

  test('CM-001: Cart Page should be empty initially',  async ({ page }) => {
     
    // Expects page to have a heading with the name of Products.
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    // Expects cart to be empty initially
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator("//*[@id='cart_contents_container']/div/div[1]/div[3]")).toBeHidden();
  });

  test('CM-002: should add items to Cart', async ({ page }) => {
     
    // Expects page to have a heading with the name of Products.
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    // Expects carts to have 3 items after adding multiple items
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator("//*[@id='cart_contents_container']/div/div[1]/div[3]")).toBeVisible();
    await expect(page.locator('[data-test="item-4-title-link"]')).toHaveText("Sauce Labs Backpack");
    await expect(page.locator('[data-test="item-0-title-link"]')).toHaveText("Sauce Labs Bike Light");
    await expect(page.locator('[data-test="item-1-title-link"]')).toHaveText("Sauce Labs Bolt T-Shirt");
  });

  test('CM-003: should remove items from the cart', async ({ page }) => {
     
    // Expects page to have a heading with the name of Products.
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    // Expects cart to have 1 item after removing two items
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator("//*[@id='cart_contents_container']/div/div[1]/div[3]")).toBeVisible();
    await expect(page.locator('[data-test="item-0-title-link"]')).toHaveText("Sauce Labs Bike Light");
    await expect(page.locator('[data-test="item-1-title-link"]')).toHaveText("Sauce Labs Bolt T-Shirt");

    // Remove two items from the cart
    await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
  });

  test('CM-004: should continue shopping after adding to cart', async ({ page }) => {
     
    // Expects page to have a heading with the name of Products.
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    // Expects cart to have 1 item after removing two items
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="continue-shopping"]').click();  

  });

  test('CM-005: should checkout shopping after adding to cart', async ({ page }) => {
     
    // Expects page to have a heading with the name of Products.
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    // Expects cart to have 1 item after removing two items
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
  });

});

test.describe('Checkout Process - Your Information', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
  });

  const fakeUser = getFakeUser();

  test('CI-001: should checkout with valid Shipping information', async ({ page }) => {
     
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Expects page to have a heading with the name of Products.
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    // Click on the checkout button
    await page.locator('[data-test="checkout"]').click();

    // Fill in shipping details with faker
    await page.locator('[data-test="firstName"]').fill(fakeUser.firstName);
    await page.locator('[data-test="lastName"]').fill(fakeUser.lastName);
    await page.locator('[data-test="postalCode"]').fill(fakeUser.postalCode);
    await page.locator('[data-test="continue"]').click();
  });

  test('CI-002: should not checkout with empty first name', async ({ page }) => {
     
    // Expects page to have a heading with the name of Products.
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    // Try checkout with empty first name details
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="lastName"]').fill(fakeUser.lastName);
    await page.locator('[data-test="postalCode"]').fill(fakeUser.postalCode);
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="checkout-info-container"] div').filter({ hasText: 'Error: First Name is required' }).nth(2).isVisible();

  });


  test('CI-003: should not checkout with empty last name', async ({ page }) => {
     
    // Expects page to have a heading with the name of Products.
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    // Try checkout with empty last name details
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill(fakeUser.firstName);
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="checkout-info-container"] div').filter({ hasText: 'Error: Last Name is required' }).nth(2).isVisible


  });
  test('CI-004: should not checkout with empty postal code', async ({ page }) => {
     
    // Expects page to have a heading with the name of Products.
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    // Try checkout with empty postal code details
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill(fakeUser.firstName);
    await page.locator('[data-test="lastName"]').fill(fakeUser.lastName);
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="checkout-info-container"] div').filter({ hasText: 'Error: Last Name is required' }).nth(2).isVisible
    
  });

    test('CI-005: should not checkout with empty Shipping information', async ({ page }) => {
     
    // Expects page to have a heading with the name of Products.
    await expect(page.locator('[data-test="title"]')).toBeVisible();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="checkout-info-container"] div').filter({ hasText: 'Error: First Name is required' }).nth(2).isVisible

  });

});

test.describe('Checkout Process - Overview', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
  });

  test('CO-001: should verify items in Checkout: Overview Page', async ({ page }) => {
     
    // Add items to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    // Go to checkout
    await page.locator('[data-test="checkout"]').click();
    // Fill in shipping details
    const fakeUser = getFakeUser();
    await page.locator('[data-test="firstName"]').fill(fakeUser.firstName);
    await page.locator('[data-test="lastName"]').fill(fakeUser.lastName);
    await page.locator('[data-test="postalCode"]').fill(fakeUser.postalCode);
    await page.locator('[data-test="continue"]').click();
    // Verify items in overview
    await expect(page.locator('.cart_item')).toHaveCount(2);
    await expect(page.locator('.cart_item').nth(0)).toContainText('Sauce Labs Backpack');
    await expect(page.locator('.cart_item').nth(1)).toContainText('Sauce Labs Bike Light');
  });

  test('CO-002: should click cancel in Checkout: Overview Page', async ({ page }) => {
     
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    const fakeUser = getFakeUser();
    await page.locator('[data-test="firstName"]').fill(fakeUser.firstName);
    await page.locator('[data-test="lastName"]').fill(fakeUser.lastName);
    await page.locator('[data-test="postalCode"]').fill(fakeUser.postalCode);
    await page.locator('[data-test="continue"]').click();
    // Click cancel and verify navigation back to products/cart
    await page.locator('[data-test="cancel"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    
  });

  test('CO-003: should click finish in Checkout: Overview Page', async ({ page }) => {
     
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    const fakeUser = getFakeUser();
    await page.locator('[data-test="firstName"]').fill(fakeUser.firstName);
    await page.locator('[data-test="lastName"]').fill(fakeUser.lastName);
    await page.locator('[data-test="postalCode"]').fill(fakeUser.postalCode);
    await page.locator('[data-test="continue"]').click();
    // Click finish and verify order completion
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

  test('CO-004: should verify cart is empty after checkout', async ({ page }) => {
     
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    const fakeUser = getFakeUser();
    await page.locator('[data-test="firstName"]').fill(fakeUser.firstName);
    await page.locator('[data-test="lastName"]').fill(fakeUser.lastName);
    await page.locator('[data-test="postalCode"]').fill(fakeUser.postalCode);
    await page.locator('[data-test="continue"]').click();
    // Click finish and verify order completion
    await page.locator('[data-test="finish"]').click();
    // Verify cart is empty
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });

  test('CO-005: should go back home after checkout finish', async ({ page }) => {
     
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    const fakeUser = getFakeUser();
    await page.locator('[data-test="firstName"]').fill(fakeUser.firstName);
    await page.locator('[data-test="lastName"]').fill(fakeUser.lastName);
    await page.locator('[data-test="postalCode"]').fill(fakeUser.postalCode);
    await page.locator('[data-test="continue"]').click();
    // Click finish and verify order completion
    await page.locator('[data-test="finish"]').click();
    // Verify navigation back to home
    await page.locator('[data-test="back-to-products"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

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
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});
