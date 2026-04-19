import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // ── Hero section ──────────────────────────────────────────────────────────

  test('has exactly one H1', async ({ page }) => {
    const h1s = await page.locator('h1').count();
    expect(h1s).toBe(1);
  });

  test('H1 contains "Reconnect"', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Reconnect');
  });

  test('"Book a Session — $111" CTA is visible in hero', async ({ page }) => {
    await expect(
      page.locator('.hero__actions').getByRole('link', { name: /Book a Session/i })
    ).toBeVisible();
  });

  test('"Meet Amy" button routes to /about', async ({ page }) => {
    await page.locator('.hero__actions').getByRole('link', { name: /Meet Amy/i }).click();
    await expect(page).toHaveURL('/about');
  });

  test('"Book a Session" in hero routes to /book', async ({ page }) => {
    await page.locator('.hero__actions').getByRole('link', { name: /Book a Session/i }).click();
    await expect(page).toHaveURL('/book');
  });

  test('hero shows locations (Easton MD, Sarasota FL, Virtual)', async ({ page }) => {
    const locations = page.locator('.hero__locations');
    await expect(locations).toContainText('Easton, MD');
    await expect(locations).toContainText('Sarasota, FL');
    await expect(locations).toContainText('Virtual Worldwide');
  });

  // ── Intro / testimonial section ───────────────────────────────────────────

  test('John Bunting testimonial quote is present', async ({ page }) => {
    await expect(page.locator('blockquote')).toContainText('golf course');
  });

  test('"Read Amy\'s Story" button routes to /about', async ({ page }) => {
    await page.getByRole('link', { name: /Read Amy's Story/i }).click();
    await expect(page).toHaveURL('/about');
  });

  // ── Services section ──────────────────────────────────────────────────────

  test('displays 3 service cards', async ({ page }) => {
    const cards = page.locator('.service-card');
    await expect(cards).toHaveCount(3);
  });

  test('service card prices are correct', async ({ page }) => {
    const grid = page.locator('.services-grid');
    await expect(grid).toContainText('$111');
    await expect(grid).toContainText('$222');
    await expect(grid).toContainText('$333');
  });

  test('"Book Now" on first service card routes to /book', async ({ page }) => {
    await page.locator('.service-card').first().getByRole('link', { name: /Book Now/i }).click();
    await expect(page).toHaveURL('/book');
  });

  test('featured card (Expansion Path) has "Most Comprehensive" badge', async ({ page }) => {
    await expect(page.locator('.service-card--featured .service-card__badge')).toContainText(
      'Most Comprehensive'
    );
  });

  // ── Process section ───────────────────────────────────────────────────────

  test('process section has 4 steps', async ({ page }) => {
    await expect(page.locator('.process__step')).toHaveCount(4);
  });

  // ── CTA Banner ────────────────────────────────────────────────────────────

  test('CTA banner "Book a Session" routes to /book', async ({ page }) => {
    await page.locator('.cta-banner').getByRole('link', { name: /Book a Session/i }).click();
    await expect(page).toHaveURL('/book');
  });

  test('CTA banner "Get in Touch" routes to /contact', async ({ page }) => {
    await page.locator('.cta-banner').getByRole('link', { name: /Get in Touch/i }).click();
    await expect(page).toHaveURL('/contact');
  });

  test('phone link in CTA banner has correct href', async ({ page }) => {
    const phone = page.locator('.cta-banner__contact a');
    await expect(phone).toHaveAttribute('href', 'tel:+16106089347');
  });

  // ── Marquee ───────────────────────────────────────────────────────────────

  test('marquee strip is marked aria-hidden', async ({ page }) => {
    await expect(page.locator('.marquee')).toHaveAttribute('aria-hidden', 'true');
  });
});

test.describe('Home Page — Mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('hero visual (photo) is hidden on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hero__visual')).toBeHidden();
  });

  test('service cards stack to single column', async ({ page }) => {
    await page.goto('/');
    const grid = page.locator('.services-grid');
    const gridCols = await grid.evaluate((el) =>
      getComputedStyle(el).gridTemplateColumns
    );
    // Single column = one track value (no spaces from multiple columns)
    expect(gridCols.trim().split(' ').length).toBe(1);
  });
});
