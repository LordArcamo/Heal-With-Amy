import type { Meta, StoryObj } from '@storybook/react';

/* ─────────────────────────────────────────────────────────
   BUTTON — Heal With Amy
   Three variants: primary (dark brown), outline, gold accent.
   ───────────────────────────────────────────────────────── */

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'outline' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  withArrow?: boolean;
}

function Button({ label, variant = 'primary', size = 'md', disabled = false, withArrow = false }: ButtonProps) {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.6rem',
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 600,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'all 0.3s ease',
    borderRadius: 0,
  };

  const sizes: Record<string, React.CSSProperties> = {
    sm: { fontSize: '0.65rem', padding: '0.6rem 1.4rem' },
    md: { fontSize: '0.75rem', padding: '0.85rem 2.2rem' },
    lg: { fontSize: '0.82rem', padding: '1rem 2.8rem' },
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: { background: '#1C1810', color: '#FDFAF5' },
    outline: { background: 'transparent', color: '#1C1810', border: '1.5px solid #1C1810' },
    gold:    { background: '#C4975A',    color: '#FDFAF5' },
  };

  return (
    <button style={{ ...base, ...sizes[size], ...variants[variant] }}>
      {label}
      {withArrow && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      )}
    </button>
  );
}

// ── Meta ─────────────────────────────────────────────────
const meta: Meta<ButtonProps> = {
  title: 'Design System/Button',
  component: Button,
  parameters: {
    backgrounds: { default: 'cream' },
    docs: {
      description: {
        component: 'Three variants used consistently across the site. **Primary** for main CTAs, **Outline** for secondary actions, **Gold** for featured/highlighted calls to action.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant:   { control: 'select', options: ['primary', 'outline', 'gold'] },
    size:      { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled:  { control: 'boolean' },
    withArrow: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: { label: 'Book a Session — $111', variant: 'primary' },
};

export const Outline: Story = {
  args: { label: 'Meet Amy', variant: 'outline' },
};

export const Gold: Story = {
  args: { label: 'Get Started', variant: 'gold' },
};

export const WithArrow: Story = {
  args: { label: 'Read Amy\'s Story', variant: 'outline', withArrow: true },
};

export const Small: Story = {
  args: { label: 'Book Now', variant: 'primary', size: 'sm' },
};

export const Large: Story = {
  args: { label: 'Book Your First Session', variant: 'gold', size: 'lg' },
};

export const Disabled: Story = {
  args: { label: 'Unavailable', variant: 'primary', disabled: true },
};

// All three variants side by side
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', padding: '2rem', background: '#FDFAF5' }}>
      <Button label="Primary CTA"  variant="primary" />
      <Button label="Secondary"    variant="outline" />
      <Button label="Featured CTA" variant="gold" />
    </div>
  ),
  name: 'All Variants',
};
