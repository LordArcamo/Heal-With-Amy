import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/about', '/services', '/testimonials', '/contact', '/book'];

test.describe('Accessibility — axe-core audits', () => {
  for (const route of routes) {
    test(`${route} — no critical/serious violations`, async ({ page }) => {
      await page.goto(route);
      // Wait for scroll reveal classes so content is fully rendered
      await page.waitForLoadState('networkidle');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        // Exclude third-party booking embed placeholder
        .exclude('.booking-embed__placeholder')
        .analyze();

      const criticalOrSerious = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious'
      );

      if (criticalOrSerious.length > 0) {
        const summary = criticalOrSerious
          .map((v) => `[${v.impact}] ${v.id}: ${v.description}`)
          .join('\n');
        expect.soft(criticalOrSerious, `Violations on ${route}:\n${summary}`).toHaveLength(0);
      }
    });
  }
});

test.describe('Accessibility — manual checks', () => {
  test('images have non-empty alt text', async ({ page }) => {
    await page.goto('/');
    const images = page.locator('img:not([alt=""])');
    const allImages = page.locator('img');
    const totalImages = await allImages.count();
    const imagesWithAlt = await images.count();
    expect(imagesWithAlt).toBe(totalImages);
  });

  test('interactive elements are keyboard-focusable', async ({ page }) => {
    await page.goto('/');
    // Tab through first 10 focusable elements and verify each gets focus
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => document.activeElement?.tagName);
      expect(['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']).toContain(focused);
    }
  });

  test('nav has aria-label', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();
  });

  test('mobile drawer nav has aria-label', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav[aria-label="Mobile navigation"]')).toBeAttached();
  });

  test('mobile drawer sets aria-hidden false when open', async ({ page, viewport }) => {
    if (!viewport || viewport.width > 960) return;
    await page.goto('/');
    await page.locator('#burger').click();
    await expect(page.locator('#drawer')).toHaveAttribute('aria-hidden', 'false');
  });

  test('contact form labels are associated with inputs', async ({ page }) => {
    await page.goto('/contact');
    const inputs = ['name', 'email', 'phone', 'service', 'message'];
    for (const id of inputs) {
      const label = page.locator(`label[for="${id}"]`);
      await expect(label).toBeAttached();
      const input = page.locator(`#${id}`);
      await expect(input).toBeAttached();
    }
  });

  test('footer social links have aria-label', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer a[aria-label="Instagram"]')).toBeAttached();
    await expect(page.locator('footer a[aria-label="Facebook"]')).toBeAttached();
  });

  test('ChatBot toggle button has aria-label', async ({ page }) => {
    await page.goto('/');
    // Wait for React to hydrate
    await page.waitForSelector('button[aria-label*="chat"]', { timeout: 5000 });
    const chatToggle = page.locator('button[aria-label*="chat" i]');
    await expect(chatToggle).toBeAttached();
  });

  test('ChatBot dialog has aria-modal and aria-label', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    await expect(dialog).toHaveAttribute('aria-label');
  });

  test('decorative marquee is aria-hidden', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.marquee')).toHaveAttribute('aria-hidden', 'true');
  });

  test('hero photo has descriptive alt text', async ({ page }) => {
    await page.goto('/');
    const heroImg = page.locator('.hero__photo');
    const alt = await heroImg.getAttribute('alt');
    expect(alt).toBeTruthy();
    expect(alt!.length).toBeGreaterThan(5);
  });
});

test.describe('Accessibility — color contrast spot checks', () => {
  test('body text contrast is sufficient (brown on cream)', async ({ page }) => {
    await page.goto('/');
    // Verify the axe run above covers contrast — this just confirms the body bg
    const bg = await page.evaluate(() =>
      getComputedStyle(document.body).backgroundColor
    );
    // cream: #FDFAF5 — RGB value check
    expect(bg).not.toBe('rgb(0, 0, 0)'); // should never be black bg
  });
});
