import { test, expect } from '@playwright/test';

const routes = ['/', '/about', '/services', '/testimonials', '/contact', '/book'];

test.describe('Navigation', () => {
  test('desktop nav renders all links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'About Amy' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Services' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Testimonials' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
  });

  test('desktop CTA "Book a Session" is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /Book a Session/i }).first()).toBeVisible();
  });

  test('nav links route to correct pages', async ({ page }) => {
    await page.goto('/');
    const links = [
      { label: 'About Amy', path: '/about' },
      { label: 'Services', path: '/services' },
      { label: 'Testimonials', path: '/testimonials' },
      { label: 'Contact', path: '/contact' },
    ];
    for (const { label, path } of links) {
      await page.goto('/');
      await page.getByRole('link', { name: label }).first().click();
      await expect(page).toHaveURL(path);
    }
  });

  test('logo links back to home', async ({ page }) => {
    await page.goto('/about');
    await page.getByRole('link', { name: /Energy Healing with Amy/i }).click();
    await expect(page).toHaveURL('/');
  });

  test('active link is highlighted on current page', async ({ page }) => {
    await page.goto('/about');
    const activeLink = page.locator('.nav__link--active');
    await expect(activeLink).toHaveText('About Amy');
  });

  test('nav scrolls and adds .scrolled class after scrolling down', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, 200));
    await expect(page.locator('#nav')).toHaveClass(/scrolled/);
  });
});

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('hamburger menu is visible on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#burger')).toBeVisible();
  });

  test('desktop nav links are hidden on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.nav__links')).toBeHidden();
  });

  test('hamburger opens the mobile drawer', async ({ page }) => {
    await page.goto('/');
    await page.locator('#burger').click();
    await expect(page.locator('#drawer')).toHaveClass(/open/);
  });

  test('drawer close button closes the drawer', async ({ page }) => {
    await page.goto('/');
    await page.locator('#burger').click();
    await page.locator('#drawer-close').click();
    await expect(page.locator('#drawer')).not.toHaveClass(/open/);
  });

  test('overlay click closes the drawer', async ({ page }) => {
    await page.goto('/');
    await page.locator('#burger').click();
    await page.locator('#overlay').click();
    await expect(page.locator('#drawer')).not.toHaveClass(/open/);
  });

  test('Escape key closes the drawer', async ({ page }) => {
    await page.goto('/');
    await page.locator('#burger').click();
    await page.keyboard.press('Escape');
    await expect(page.locator('#drawer')).not.toHaveClass(/open/);
  });

  test('body scroll is locked when drawer is open', async ({ page }) => {
    await page.goto('/');
    await page.locator('#burger').click();
    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe('hidden');
  });

  test('nav link in drawer navigates and closes drawer', async ({ page }) => {
    await page.goto('/');
    await page.locator('#burger').click();
    await page.locator('#drawer a[href="/about"]').click();
    await expect(page).toHaveURL('/about');
    await expect(page.locator('#drawer')).not.toHaveClass(/open/);
  });

  test('"Book a Session" CTA inside drawer routes to /book', async ({ page }) => {
    await page.goto('/');
    await page.locator('#burger').click();
    await page.locator('.nav__drawer-cta').click();
    await expect(page).toHaveURL('/book');
  });

  test('burger aria-expanded is true when open', async ({ page }) => {
    await page.goto('/');
    await page.locator('#burger').click();
    await expect(page.locator('#burger')).toHaveAttribute('aria-expanded', 'true');
  });

  test('burger aria-expanded is false when closed', async ({ page }) => {
    await page.goto('/');
    await page.locator('#burger').click();
    await page.locator('#drawer-close').click();
    await expect(page.locator('#burger')).toHaveAttribute('aria-expanded', 'false');
  });
});

test.describe('All pages have nav + footer', () => {
  for (const route of routes) {
    test(`${route} renders nav and footer`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator('#nav')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    });
  }
});
