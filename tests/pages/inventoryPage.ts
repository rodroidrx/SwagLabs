import { Page, Locator } from '@playwright/test';

class InventoryPage {
  private page: Page;
   readonly addToCartButtons: Locator;
   readonly cartIcon: Locator;
   readonly firstItem: Locator;
   readonly title: Locator;
   readonly firstItemTitle: Locator;
   readonly inventoryItemName: Locator;
   readonly backToProductsButton: Locator;

   readonly inventoryItemPrice: Locator;

  constructor(page: Page) {

    this.page = page;
    this.addToCartButtons = page.locator('.inventory_item .btn_inventory');
    this.cartIcon = page.locator('#shopping_cart_container');
    this.firstItem = page.locator("//*[@id='inventory_container']/div/div[1]/div[2]/div[1]/a/div");
    this.title = page.locator('[data-test="title"]');
    this.firstItemTitle = page.locator('[data-test="item-4-title-link"]');
    this.inventoryItemName = page.locator('[data-test="inventory-item-name"]');
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
    this.inventoryItemPrice = page.locator('[data-test="inventory-item-price"]')  

  }

  async addItemToCart(itemIndex: number) {
    await this.addToCartButtons.nth(itemIndex).click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }


  
  async backToProducts() {
    await this.page.locator('[data-test="back-to-products"]').click();
  }

  async sortProductsBy(option: string) {
    await this.page.locator('.product_sort_container').selectOption(option);
  }
}

export default InventoryPage;
