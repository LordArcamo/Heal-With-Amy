import type { Meta, StoryObj } from '@storybook/react';

/* ─────────────────────────────────────────────────────────
   SERVICE CARD — Heal With Amy
   Used on the homepage and /services page.
   Two styles: default (cream-dark bg) and featured (dark brown bg).
   ───────────────────────────────────────────────────────── */

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  price: string;
  priceUnit: string;
  featured?: boolean;
  badge?: string;
  ctaLabel?: string;
}

function ServiceCard({
  number,
  title,
  description,
  price,
  priceUnit,
  featured = false,
  badge,
  ctaLabel = 'Learn More',
}: ServiceCardProps) {
  const bg   = featured ? '#1C1810' : '#F5EFE4';
  const text = featured ? 'rgba(253,250,245,0.85)' : '#6B5B45';
  const head = featured ? '#FDFAF5' : '#1C1810';
  const pr   = featured ? '#DBBF8C' : '#1C1810';
  const prU  = featured ? 'rgba(253,250,245,0.4)' : '#9C8E7E';
  const btnBg = featured ? '#C4975A' : 'transparent';
  const btnBorder = featured ? 'none' : '1.5px solid #1C1810';
  const btnColor  = featured ? '#FDFAF5' : '#1C1810';

  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${featured ? '#1C1810' : '#EDE4D6'}`,
        padding: '2.5rem 2rem',
        position: 'relative',
        width: 300,
        fontFamily: "'Raleway', sans-serif",
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {badge && (
        <div
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#C4975A',
            color: '#FDFAF5',
            fontSize: '0.62rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '0.25rem 0.6rem',
          }}
        >
          {badge}
        </div>
      )}

      {/* Number */}
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '3.5rem',
          fontWeight: 300,
          color: featured ? 'rgba(219,191,140,0.15)' : 'rgba(196,151,90,0.2)',
          lineHeight: 1,
          marginBottom: '0.5rem',
        }}
      >
        {number}
      </div>

      {/* Icon placeholder */}
      <div
        style={{
          width: 36,
          height: 36,
          marginBottom: '1rem',
          color: featured ? '#DBBF8C' : '#C4975A',
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.35rem',
          fontWeight: 500,
          color: head,
          marginBottom: '0.75rem',
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p style={{ fontSize: '0.87rem', color: text, lineHeight: 1.75, marginBottom: '2rem' }}>
        {description}
      </p>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 500, color: pr }}>
            {price}
          </span>
          <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.75rem', color: prU, marginLeft: '0.25rem' }}>
            {priceUnit}
          </span>
        </div>
        <button
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: '0.65rem 1.4rem',
            background: btnBg,
            border: btnBorder,
            color: btnColor,
            cursor: 'pointer',
          }}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}

// ── Meta ─────────────────────────────────────────────────
const meta: Meta<ServiceCardProps> = {
  title: 'Components/ServiceCard',
  component: ServiceCard,
  parameters: {
    backgrounds: { default: 'cream' },
    docs: {
      description: {
        component: 'Used on the homepage services grid and /services page. The `featured` prop switches to the dark brown variant for the premium offering.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    featured: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<ServiceCardProps>;

export const Default: Story = {
  args: {
    number: '01',
    title: 'Custom Healing Session',
    description:
      "One-on-one energy healing designed to support emotional release, balance, and deep relaxation. Amy's signature technique combines Reiki elements with astral body work for profound results.",
    price: '$111',
    priceUnit: '/ 45 min',
    ctaLabel: 'Book Now',
  },
};

export const Alignment: Story = {
  args: {
    number: '02',
    title: 'Alignment Path',
    description:
      'Monthly 1:1 mentorship to deepen your connection to intuition and energy. Includes chakra awareness, grounding practices, and personalized integration exercises.',
    price: '$222',
    priceUnit: '/ month',
  },
};

export const Featured: Story = {
  args: {
    number: '03',
    title: 'Expansion Path',
    description:
      'Full-access mentorship with one monthly session plus ongoing voice and text support. Receive in-depth personalized guidance whenever you need it.',
    price: '$333',
    priceUnit: '/ month',
    featured: true,
    badge: 'Most Comprehensive',
  },
};

export const AllThree: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', padding: '2rem', background: '#FDFAF5' }}>
      <ServiceCard
        number="01" title="Custom Healing Session"
        description="One-on-one energy healing for emotional release and balance."
        price="$111" priceUnit="/ 45 min" ctaLabel="Book Now"
      />
      <ServiceCard
        number="02" title="Alignment Path"
        description="Monthly mentorship to deepen your intuition and energy practice."
        price="$222" priceUnit="/ month"
      />
      <ServiceCard
        number="03" title="Expansion Path"
        description="Full-access mentorship with ongoing voice and text support."
        price="$333" priceUnit="/ month"
        featured badge="Most Comprehensive"
      />
    </div>
  ),
  name: 'All Three Cards',
  parameters: { layout: 'fullscreen' },
};
