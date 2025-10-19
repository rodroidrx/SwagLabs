import { Page, Locator } from '@playwright/test';

class InventoryPage {
  private page: Page;
  private addToCartButtons: Locator;
  private cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButtons = page.locator('.inventory_item .btn_inventory');
    this.cartIcon = page.locator('#shopping_cart_container');
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
