import { test, expect } from '@playwright/test';

const pages = [
  { route: '/',              title: 'Energy Healing with Amy' },
  { route: '/about',         title: 'About Amy' },
  { route: '/services',      title: 'Services' },
  { route: '/testimonials',  title: 'Testimonials' },
  { route: '/contact',       title: 'Contact Amy' },
  { route: '/book',          title: 'Book a Session' },
];

test.describe('SEO — Meta tags', () => {
  for (const { route, title } of pages) {
    test(`${route} — page title contains "${title}"`, async ({ page }) => {
      await page.goto(route);
      await expect(page).toHaveTitle(new RegExp(title, 'i'));
    });

    test(`${route} — meta description is set`, async ({ page }) => {
      await page.goto(route);
      const desc = await page.locator('meta[name="description"]').getAttribute('content');
      expect(desc).toBeTruthy();
      expect(desc!.length).toBeGreaterThan(50);
    });

    test(`${route} — canonical URL is set`, async ({ page }) => {
      await page.goto(route);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBeTruthy();
      expect(canonical).toContain('healwithamy.com');
    });

    test(`${route} — og:title is set`, async ({ page }) => {
      await page.goto(route);
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toBeTruthy();
    });

    test(`${route} — og:description is set`, async ({ page }) => {
      await page.goto(route);
      const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
      expect(ogDesc).toBeTruthy();
    });

    test(`${route} — og:image is set`, async ({ page }) => {
      await page.goto(route);
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
      expect(ogImage).toBeTruthy();
      expect(ogImage).toContain('/og-image.jpg');
    });

    test(`${route} — twitter:card is summary_large_image`, async ({ page }) => {
      await page.goto(route);
      const card = await page.locator('meta[name="twitter:card"]').getAttribute('content');
      expect(card).toBe('summary_large_image');
    });

    test(`${route} — robots is "index, follow"`, async ({ page }) => {
      await page.goto(route);
      const robots = await page.locator('meta[name="robots"]').getAttribute('content');
      expect(robots).toBe('index, follow');
    });
  }

  test('all pages have unique titles', async ({ page }) => {
    const titles: string[] = [];
    for (const { route } of pages) {
      await page.goto(route);
      titles.push(await page.title());
    }
    const unique = new Set(titles);
    expect(unique.size).toBe(titles.length);
  });
});

test.describe('SEO — Structured Data', () => {
  test('home page has valid JSON-LD schema', async ({ page }) => {
    await page.goto('/');
    const schemaText = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(schemaText).toBeTruthy();
    const schema = JSON.parse(schemaText!);
    expect(schema['@type']).toBe('HealthAndBeautyBusiness');
    expect(schema.name).toBe('Energy Healing with Amy');
    expect(schema.telephone).toBe('+16106089347');
    expect(schema.email).toBe('healwithamyo@gmail.com');
    expect(schema.priceRange).toBeTruthy();
  });

  test('JSON-LD contains two address locations', async ({ page }) => {
    await page.goto('/');
    const schemaText = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const schema = JSON.parse(schemaText!);
    expect(Array.isArray(schema.address)).toBe(true);
    expect(schema.address.length).toBe(2);
    const regions = schema.address.map((a: { addressRegion: string }) => a.addressRegion);
    expect(regions).toContain('MD');
    expect(regions).toContain('FL');
  });
});

test.describe('SEO — Heading hierarchy', () => {
  for (const { route } of pages) {
    test(`${route} — has exactly one H1`, async ({ page }) => {
      await page.goto(route);
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);
    });
  }
});

test.describe('SEO — Sitemap & robots', () => {
  test('sitemap.xml is accessible', async ({ page }) => {
    const res = await page.goto('/sitemap.xml');
    expect(res?.status()).toBe(200);
  });

  test('robots.txt is accessible', async ({ page }) => {
    const res = await page.goto('/robots.txt');
    expect(res?.status()).toBe(200);
  });
});
