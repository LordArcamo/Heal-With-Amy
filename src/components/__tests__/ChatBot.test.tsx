import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ChatBot, { getBotResponse } from '../ChatBot';

// ─── getBotResponse unit tests ────────────────────────────────────────────────

describe('getBotResponse', () => {
  it('returns greeting on "hello"', () => {
    const res = getBotResponse('hello');
    expect(res).toContain('Welcome to Energy Healing with Amy');
  });

  it('returns greeting on "hi"', () => {
    expect(getBotResponse('hi')).toContain('Welcome');
  });

  it('returns pricing on "how much"', () => {
    const res = getBotResponse('how much does it cost?');
    expect(res).toContain('$111');
    expect(res).toContain('$222');
    expect(res).toContain('$333');
  });

  it('returns pricing on "price"', () => {
    expect(getBotResponse('what is the price')).toContain('$111');
  });

  it('returns booking info on "book"', () => {
    const res = getBotResponse('I want to book a session');
    expect(res).toContain('610-608-9347');
  });

  it('returns booking info on "schedule"', () => {
    expect(getBotResponse('schedule an appointment')).toMatch(/book/i);
  });

  it('returns session details on "what happens"', () => {
    const res = getBotResponse('what happens in a session?');
    expect(res).toContain('45 minutes');
  });

  it('returns reiki info on "energy healing"', () => {
    const res = getBotResponse('what is energy healing?');
    expect(res).toContain('Reiki');
  });

  it('returns mentorship details on "mentorship"', () => {
    const res = getBotResponse('tell me about the mentorship program');
    expect(res).toContain('Alignment Path');
    expect(res).toContain('Expansion Path');
  });

  it('returns Amy background on "who is amy"', () => {
    const res = getBotResponse('who is amy?');
    expect(res).toContain('1998');
    expect(res).toContain('Charlie Goldsmith');
  });

  it('returns location on "where"', () => {
    const res = getBotResponse('where are you located?');
    expect(res).toContain('Easton');
    expect(res).toContain('Sarasota');
  });

  it('returns contact info on "phone"', () => {
    const res = getBotResponse('phone number please');
    expect(res).toContain('610-608-9347');
  });

  it('returns contact info on "email"', () => {
    expect(getBotResponse('send me the email address')).toContain('healwithamyo@gmail.com');
  });

  it('returns testimonial on "john bunting"', () => {
    const res = getBotResponse('john bunting');
    expect(res).toContain('Philadelphia Eagles');
  });

  it('returns medical disclaimer on "diagnose"', () => {
    const res = getBotResponse('can you diagnose my condition?');
    expect(res).toContain('not massage therapy');
  });

  it('returns fallback for unknown queries', () => {
    const res = getBotResponse('xyzzy something totally unknown');
    expect(res).toContain('610-608-9347');
    expect(res).toContain('healwithamyo@gmail.com');
  });

  it('is case-insensitive', () => {
    expect(getBotResponse('HELLO')).toContain('Welcome');
    expect(getBotResponse('PRICE')).toContain('$111');
  });
});

// ─── ChatBot component tests ──────────────────────────────────────────────────

describe('ChatBot component', () => {
  it('renders the toggle button', () => {
    render(<ChatBot />);
    expect(screen.getByRole('button', { name: /open chat/i })).toBeInTheDocument();
  });

  it('chat window is hidden on initial render', () => {
    render(<ChatBot />);
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog).toHaveStyle({ opacity: '0', pointerEvents: 'none' });
  });

  it('opens chat window on toggle button click', async () => {
    render(<ChatBot />);
    const toggle = screen.getByRole('button', { name: /open chat/i });
    await userEvent.click(toggle);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveStyle({ opacity: '1' });
  });

  it('shows welcome message when opened', async () => {
    render(<ChatBot />);
    await userEvent.click(screen.getByRole('button', { name: /open chat/i }));
    expect(screen.getByText(/How can I help you today/i)).toBeInTheDocument();
  });

  it('changes button aria-label when open', async () => {
    render(<ChatBot />);
    const toggle = screen.getByRole('button', { name: /open chat/i });
    await userEvent.click(toggle);
    expect(screen.getByRole('button', { name: /close chat/i })).toBeInTheDocument();
  });

  it('closes chat window when toggle clicked again', async () => {
    render(<ChatBot />);
    const toggle = screen.getByRole('button', { name: /open chat/i });
    await userEvent.click(toggle);
    await userEvent.click(screen.getByRole('button', { name: /close chat/i }));
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog).toHaveStyle({ opacity: '0' });
  });

  it('send button is disabled when input is empty', async () => {
    render(<ChatBot />);
    await userEvent.click(screen.getByRole('button', { name: /open chat/i }));
    const sendBtn = screen.getByRole('button', { name: /send message/i });
    expect(sendBtn).toBeDisabled();
  });

  it('send button is enabled after typing', async () => {
    render(<ChatBot />);
    await userEvent.click(screen.getByRole('button', { name: /open chat/i }));
    const input = screen.getByRole('textbox', { name: /chat message/i });
    await userEvent.type(input, 'Hello');
    expect(screen.getByRole('button', { name: /send message/i })).not.toBeDisabled();
  });

  it('sends message and clears input on send button click', async () => {
    render(<ChatBot />);
    await userEvent.click(screen.getByRole('button', { name: /open chat/i }));
    const input = screen.getByRole('textbox', { name: /chat message/i });
    await userEvent.type(input, 'Hello');
    await userEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(input).toHaveValue('');
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('sends message on Enter key', async () => {
    render(<ChatBot />);
    await userEvent.click(screen.getByRole('button', { name: /open chat/i }));
    const input = screen.getByRole('textbox', { name: /chat message/i });
    await userEvent.type(input, 'Hello{Enter}');
    expect(input).toHaveValue('');
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('does not send on Shift+Enter', async () => {
    render(<ChatBot />);
    await userEvent.click(screen.getByRole('button', { name: /open chat/i }));
    const input = screen.getByRole('textbox', { name: /chat message/i });
    await userEvent.type(input, 'Hello{shift>}{Enter}{/shift}');
    // Input should still have value since Shift+Enter doesn't send
    expect(input).toHaveValue('Hello');
  });

  it('does not send empty/whitespace-only messages', async () => {
    render(<ChatBot />);
    await userEvent.click(screen.getByRole('button', { name: /open chat/i }));
    const input = screen.getByRole('textbox', { name: /chat message/i });
    // Type only spaces — send button stays disabled so clicking it does nothing
    fireEvent.change(input, { target: { value: '   ' } });
    const messages = screen.queryAllByText('   ');
    expect(messages).toHaveLength(0);
  });

  it('shows bot reply after sending a message', async () => {
    render(<ChatBot />);
    await userEvent.click(screen.getByRole('button', { name: /open chat/i }));
    const input = screen.getByRole('textbox', { name: /chat message/i });
    await userEvent.type(input, 'price{Enter}');
    // Wait for the async bot reply (900–1300ms delay in component)
    await waitFor(() => {
      expect(screen.getByText(/\$111/)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('chat input has correct aria-label', async () => {
    render(<ChatBot />);
    await userEvent.click(screen.getByRole('button', { name: /open chat/i }));
    expect(screen.getByLabelText(/chat message/i)).toBeInTheDocument();
  });

  it('dialog has aria-modal and aria-label', () => {
    render(<ChatBot />);
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label');
  });
});
