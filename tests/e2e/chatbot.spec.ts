import { test, expect } from '@playwright/test';

test.describe('ChatBot — E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for React to hydrate the ChatBot
    await page.waitForSelector('button[aria-label*="chat" i]', { timeout: 8000 });
  });

  test('chat toggle button is visible on page load', async ({ page }) => {
    const toggle = page.locator('button[aria-label*="Open chat" i]');
    await expect(toggle).toBeVisible();
  });

  test('chat window is closed on page load', async ({ page }) => {
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toHaveCSS('opacity', '0');
  });

  test('clicking toggle opens the chat window', async ({ page }) => {
    await page.locator('button[aria-label*="Open chat" i]').click();
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toHaveCSS('opacity', '1');
  });

  test('welcome message is shown when chat opens', async ({ page }) => {
    await page.locator('button[aria-label*="Open chat" i]').click();
    await expect(page.locator('[role="dialog"]')).toContainText("Amy's assistant");
  });

  test('toggle button label changes to "Close chat" when open', async ({ page }) => {
    await page.locator('button[aria-label*="Open chat" i]').click();
    await expect(page.locator('button[aria-label*="Close chat" i]')).toBeVisible();
  });

  test('clicking toggle again closes the chat', async ({ page }) => {
    await page.locator('button[aria-label*="Open chat" i]').click();
    await page.locator('button[aria-label*="Close chat" i]').click();
    await expect(page.locator('[role="dialog"]')).toHaveCSS('opacity', '0');
  });

  test('send button is disabled when input is empty', async ({ page }) => {
    await page.locator('button[aria-label*="Open chat" i]').click();
    const sendBtn = page.locator('button[aria-label="Send message"]');
    await expect(sendBtn).toBeDisabled();
  });

  test('can type in the chat input', async ({ page }) => {
    await page.locator('button[aria-label*="Open chat" i]').click();
    const input = page.locator('[aria-label="Chat message"]');
    await input.fill('Hello');
    await expect(input).toHaveValue('Hello');
  });

  test('send button is enabled after typing', async ({ page }) => {
    await page.locator('button[aria-label*="Open chat" i]').click();
    await page.locator('[aria-label="Chat message"]').fill('Hello');
    await expect(page.locator('button[aria-label="Send message"]')).not.toBeDisabled();
  });

  test('sending a message adds it to the chat', async ({ page }) => {
    await page.locator('button[aria-label*="Open chat" i]').click();
    await page.locator('[aria-label="Chat message"]').fill('Hello');
    await page.locator('button[aria-label="Send message"]').click();
    await expect(page.locator('[role="dialog"]')).toContainText('Hello');
  });

  test('input is cleared after sending', async ({ page }) => {
    await page.locator('button[aria-label*="Open chat" i]').click();
    const input = page.locator('[aria-label="Chat message"]');
    await input.fill('Hello');
    await page.locator('button[aria-label="Send message"]').click();
    await expect(input).toHaveValue('');
  });

  test('pressing Enter sends the message', async ({ page }) => {
    await page.locator('button[aria-label*="Open chat" i]').click();
    const input = page.locator('[aria-label="Chat message"]');
    await input.fill('Hello');
    await input.press('Enter');
    await expect(page.locator('[role="dialog"]')).toContainText('Hello');
    await expect(input).toHaveValue('');
  });

  test('bot replies with pricing info when asked about price', async ({ page }) => {
    await page.locator('button[aria-label*="Open chat" i]').click();
    await page.locator('[aria-label="Chat message"]').fill('what is the price?');
    await page.locator('button[aria-label="Send message"]').click();
    // Wait for typing indicator to disappear and bot reply to arrive
    await expect(page.locator('[role="dialog"]')).toContainText('$111', { timeout: 5000 });
  });

  test('bot replies with booking info when asked how to book', async ({ page }) => {
    await page.locator('button[aria-label*="Open chat" i]').click();
    await page.locator('[aria-label="Chat message"]').fill('how do I book?');
    await page.locator('button[aria-label="Send message"]').click();
    await expect(page.locator('[role="dialog"]')).toContainText('610-608-9347', { timeout: 5000 });
  });

  test('bot returns fallback for unknown query', async ({ page }) => {
    await page.locator('button[aria-label*="Open chat" i]').click();
    await page.locator('[aria-label="Chat message"]').fill('zzz unknown question xyz');
    await page.locator('button[aria-label="Send message"]').click();
    await expect(page.locator('[role="dialog"]')).toContainText('healwithamyo@gmail.com', {
      timeout: 5000,
    });
  });

  test('chat widget does not cover main navigation', async ({ page }) => {
    const chatBtn = page.locator('button[aria-label*="Open chat" i]');
    const chatBtnBox = await chatBtn.boundingBox();
    const navBar = page.locator('#nav');
    const navBox = await navBar.boundingBox();

    if (chatBtnBox && navBox) {
      // Chat button bottom should not overlap nav (nav is at top, chat is fixed bottom-right)
      expect(chatBtnBox.y).toBeGreaterThan(navBox.y + navBox.height);
    }
  });
});

test.describe('ChatBot — Mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('chat window stays within viewport width on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('button[aria-label*="Open chat" i]', { timeout: 8000 });
    await page.locator('button[aria-label*="Open chat" i]').click();

    const dialog = page.locator('[role="dialog"]');
    const box = await dialog.boundingBox();
    if (box) {
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(390 + 5); // 5px tolerance
    }
  });
});
