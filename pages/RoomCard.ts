import { Page, Locator, expect } from '@playwright/test';

export class RoomCard {
  readonly page: Page;

  // Container for the list of rooms (grid 1 column/2 columns)
  readonly listingGrid: Locator;

  // List of room cards (ant-card)
  readonly roomCards: Locator;

  constructor(page: Page) {
    this.page = page;

    // <div class="mx-auto container grid grid-cols-1 lg:grid-cols-2 gap-3">
    this.listingGrid = page.locator('div.mx-auto.container.grid.grid-cols-1.lg\\:grid-cols-2.gap-3');

    // <div class="ant-card ...">
    this.roomCards = page.locator('.ant-card.ant-card-bordered');
  }

  /**
   * Get room card by index (0-based)
   */
  getRoomCard(index: number): Locator {
    return this.roomCards.nth(index);
  }

  /**
   * Verify a card has complete information:
   * - Image
   * - Subtitle (room type/area)
   * - Room title
   * - Capacity (x guests • ...)
   * - Amenities (Wifi • ...)
   * - Price / night
   */
  async verifyRoomCardHasFullInfo(cardIndex: number = 0): Promise<void> {
    const card = this.getRoomCard(cardIndex);
    await expect(card).toBeVisible();

    // Image: img.object-cover (inside swiper)
    const img = card.locator('img.object-cover').first();
    await expect(img).toBeVisible();
    await expect(img).toHaveAttribute('src', /.+/);

    // Subtitle: p.text-gray-500.text-md.truncate (line 1)
    const subtitle = card.locator('p.text-gray-500.text-md.truncate').nth(0);
    await expect(subtitle).toBeVisible();
    await expect(subtitle).not.toHaveText('');

    // Title: p.truncate.text-xl
    const title = card.locator('p.truncate.text-xl');
    await expect(title).toBeVisible();
    await expect(title).not.toHaveText('');

    // Capacity: line contains "khách"
    const capacity = card.locator('p.text-gray-500.text-md.truncate', { hasText: 'khách' });
    await expect(capacity).toBeVisible();

    // Amenities: multiple <span> in amenities line
    // (amenities line is p.text-gray-500... contains Wifi or "•" symbol)
    const amenitiesLine = card.locator('p.text-gray-500.text-md.truncate', { hasText: '•' }).last();
    await expect(amenitiesLine).toBeVisible();

    const amenities = amenitiesLine.locator('span');
    const amenitiesCount = await amenities.count();
    expect(amenitiesCount).toBeGreaterThan(0);

    // Price: <div class="text-right mt-12"><span class="font-bold">$ 28</span> / night</div>
    const price = card.locator('div.text-right.mt-12 span.font-bold');
    await expect(price).toBeVisible();
    await expect(price).toHaveText(/\$\s*\d+/);

    // Optional: link to room detail exists
    const detailLink = card.locator('xpath=ancestor::a[1]');
    // If card structure is inside <a href="/room-detail/1">
    // then check href:
    await expect(detailLink).toHaveAttribute('href', /\/room-detail\/\d+/);
  }

  /**
   * Verify multiple first cards (default 3)
   */
  async verifyTopRoomCardsHaveFullInfo(count: number = 3): Promise<void> {
    const total = await this.roomCards.count();
    const n = Math.min(count, total);

    for (let i = 0; i < n; i++) {
      await this.verifyRoomCardHasFullInfo(i);
    }
  }
}