import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('page has correct H1', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('healing journey');
  });

  test('has exactly one H1', async ({ page }) => {
    expect(await page.locator('h1').count()).toBe(1);
  });

  // ── Contact methods ───────────────────────────────────────────────────────

  test('phone link is correct', async ({ page }) => {
    const phoneLink = page.getByRole('link', { name: /610-608-9347/ }).first();
    await expect(phoneLink).toHaveAttribute('href', 'tel:+16106089347');
  });

  test('email link is correct', async ({ page }) => {
    const emailLink = page.getByRole('link', { name: /healwithamyo@gmail.com/ }).first();
    await expect(emailLink).toHaveAttribute('href', 'mailto:healwithamyo@gmail.com');
  });

  test('Instagram link opens in new tab', async ({ page }) => {
    const igLink = page.getByRole('link', { name: /@healwithamy/i });
    await expect(igLink).toHaveAttribute('target', '_blank');
    await expect(igLink).toHaveAttribute('rel', /noopener/);
  });

  test('"Book Online Now" button routes to /book', async ({ page }) => {
    await page.getByRole('link', { name: /Book Online Now/i }).click();
    await expect(page).toHaveURL('/book');
  });

  // ── Contact form ──────────────────────────────────────────────────────────

  test('form renders all expected fields', async ({ page }) => {
    await expect(page.getByLabel(/Your Name/i)).toBeVisible();
    await expect(page.getByLabel(/Email Address/i)).toBeVisible();
    await expect(page.getByLabel(/Phone Number/i)).toBeVisible();
    await expect(page.getByLabel(/Interested In/i)).toBeVisible();
    await expect(page.getByLabel(/Your Message/i)).toBeVisible();
  });

  test('name field is required', async ({ page }) => {
    const input = page.getByLabel(/Your Name/i);
    expect(await input.getAttribute('required')).not.toBeNull();
  });

  test('email field is required and type=email', async ({ page }) => {
    const input = page.getByLabel(/Email Address/i);
    expect(await input.getAttribute('required')).not.toBeNull();
    expect(await input.getAttribute('type')).toBe('email');
  });

  test('message field is required', async ({ page }) => {
    const textarea = page.getByLabel(/Your Message/i);
    expect(await textarea.getAttribute('required')).not.toBeNull();
  });

  test('phone field is optional (no required attribute)', async ({ page }) => {
    const input = page.getByLabel(/Phone Number/i);
    expect(await input.getAttribute('required')).toBeNull();
  });

  test('phone field has type=tel', async ({ page }) => {
    expect(await page.getByLabel(/Phone Number/i).getAttribute('type')).toBe('tel');
  });

  test('service dropdown contains all 4 options', async ({ page }) => {
    const select = page.getByLabel(/Interested In/i);
    await expect(select.locator('option[value="custom-session"]')).toHaveText(
      'Custom Healing Session ($111)'
    );
    await expect(select.locator('option[value="alignment-path"]')).toHaveText(
      'Alignment Path Mentorship ($222/mo)'
    );
    await expect(select.locator('option[value="expansion-path"]')).toHaveText(
      'Expansion Path Mentorship ($333/mo)'
    );
    await expect(select.locator('option[value="not-sure"]')).toHaveText(
      'Not sure yet — just exploring'
    );
  });

  test('browser prevents submission when required fields are empty', async ({ page }) => {
    await page.getByRole('button', { name: /Send Message/i }).click();
    // Browser native validation blocks submission — URL stays on /contact
    await expect(page).toHaveURL('/contact');
  });

  test('browser prevents submission with invalid email', async ({ page }) => {
    await page.getByLabel(/Your Name/i).fill('Jane Smith');
    await page.getByLabel(/Email Address/i).fill('not-an-email');
    await page.getByLabel(/Your Message/i).fill('Hello');
    await page.getByRole('button', { name: /Send Message/i }).click();
    await expect(page).toHaveURL('/contact');
  });

  test('form fields accept input correctly', async ({ page }) => {
    await page.getByLabel(/Your Name/i).fill('Jane Smith');
    await page.getByLabel(/Email Address/i).fill('jane@example.com');
    await page.getByLabel(/Phone Number/i).fill('610-555-0000');
    await page.getByLabel(/Your Message/i).fill('I would like to book a session.');
    await page.getByLabel(/Interested In/i).selectOption('custom-session');

    await expect(page.getByLabel(/Your Name/i)).toHaveValue('Jane Smith');
    await expect(page.getByLabel(/Email Address/i)).toHaveValue('jane@example.com');
    await expect(page.getByLabel(/Interested In/i)).toHaveValue('custom-session');
  });

  test('form has data-netlify attribute', async ({ page }) => {
    const form = page.locator('form[name="contact"]');
    await expect(form).toHaveAttribute('data-netlify', 'true');
  });

  test('focus styles are applied on input focus', async ({ page }) => {
    const input = page.getByLabel(/Your Name/i);
    await input.focus();
    const borderColor = await input.evaluate((el) => getComputedStyle(el).borderColor);
    // --gold = #C4975A → should not be the default parchment color
    expect(borderColor).not.toBe('rgb(237, 228, 214)'); // --parchment
  });

  // ── Responsive ────────────────────────────────────────────────────────────

  test.describe('Mobile', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('form row stacks to single column on mobile', async ({ page }) => {
      await page.goto('/contact');
      const formRow = page.locator('.form-row');
      const gridCols = await formRow.evaluate((el) =>
        getComputedStyle(el).gridTemplateColumns
      );
      expect(gridCols.trim().split(' ').length).toBe(1);
    });
  });
});
