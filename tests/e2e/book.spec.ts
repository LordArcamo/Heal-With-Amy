import { test, expect } from '@playwright/test';

test.describe('Book Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/book');
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Book a Session/i);
  });

  test('has exactly one H1', async ({ page }) => {
    expect(await page.locator('h1').count()).toBe(1);
  });

  test('H1 contains "healing session"', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('healing session');
  });

  test('session price $111 is displayed', async ({ page }) => {
    await expect(page.locator('.book-meta')).toContainText('$111');
  });

  test('session duration 45 minutes is displayed', async ({ page }) => {
    await expect(page.locator('.book-meta')).toContainText('45 minutes');
  });

  test('in-person or virtual option is shown', async ({ page }) => {
    await expect(page.locator('.book-meta')).toContainText(/in.person or virtual/i);
  });

  test('includes list has 6 items', async ({ page }) => {
    await expect(page.locator('.book-includes li')).toHaveCount(6);
  });

  test('phone fallback link is correct', async ({ page }) => {
    const phoneLink = page.getByRole('link', { name: /610-608-9347/ });
    await expect(phoneLink).toHaveAttribute('href', 'tel:+16106089347');
  });

  test('booking embed placeholder is visible', async ({ page }) => {
    await expect(page.locator('.booking-embed__placeholder')).toBeVisible();
  });

  test('placeholder shows fallback contact options', async ({ page }) => {
    const placeholder = page.locator('.booking-embed__note');
    await expect(placeholder).toContainText('610-608-9347');
    await expect(placeholder).toContainText('healwithamyo@gmail.com');
  });

  test('"Book on Original Site" link opens in new tab', async ({ page }) => {
    const link = page.getByRole('link', { name: /Book on Original Site/i });
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', /noopener/);
  });

  test('page is responsive — stacks to 1 column on mobile', async ({ page, viewport }) => {
    if (viewport && viewport.width <= 768) {
      const grid = page.locator('.book-body__grid');
      const cols = await grid.evaluate((el) =>
        getComputedStyle(el).gridTemplateColumns
      );
      expect(cols.trim().split(' ').length).toBe(1);
    }
  });
});
