import { test as base } from '@playwright/test';
import InventoryPage from '../pages/InventoryPage';

// Extend the built-in test with a custom fixture
type InventoryFixture = {
  inventoryPage: InventoryPage;
};

export const test = base.extend<InventoryFixture>({
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
});

export { expect } from '@playwright/test';