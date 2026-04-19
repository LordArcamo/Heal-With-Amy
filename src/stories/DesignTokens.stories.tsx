import type { Meta, StoryObj } from '@storybook/react';

/* ─────────────────────────────────────────────────────────
   DESIGN TOKENS — Heal With Amy
   Single source of truth for all brand colors, typography,
   and spacing used across the project.
   ───────────────────────────────────────────────────────── */

// ── Color Swatch Component ───────────────────────────────
function Swatch({
  name,
  cssVar,
  hex,
  textDark = true,
}: {
  name: string;
  cssVar: string;
  hex: string;
  textDark?: boolean;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div
        style={{
          background: `var(${cssVar}, ${hex})`,
          width: '100%',
          height: 80,
          borderRadius: '6px 6px 0 0',
          border: '1px solid rgba(0,0,0,0.06)',
          borderBottom: 'none',
        }}
      />
      <div
        style={{
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '0 0 6px 6px',
          padding: '0.6rem 0.75rem',
        }}
      >
        <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 700, color: '#1C1810' }}>
          {hex}
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#9C8E7E', marginTop: 2 }}>
          {cssVar}
        </div>
        <div style={{ fontFamily: 'sans-serif', fontSize: '0.7rem', color: '#3A3020', marginTop: 4, fontWeight: 600 }}>
          {name}
        </div>
      </div>
    </div>
  );
}

// ── Token Group wrapper ───────────────────────────────────
function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <h3
        style={{
          fontFamily: 'monospace',
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#7C9070',
          marginBottom: '1rem',
          borderBottom: '1px solid #EDE4D6',
          paddingBottom: '0.5rem',
        }}
      >
        {label}
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '1rem',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ── Typography Sample ─────────────────────────────────────
function TypeSample({
  label,
  style,
  text,
}: {
  label: string;
  style: React.CSSProperties;
  text: string;
}) {
  return (
    <div
      style={{
        padding: '1.5rem',
        border: '1px solid #EDE4D6',
        borderRadius: 6,
        background: '#FDFAF5',
      }}
    >
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: '0.65rem',
          color: '#9C8E7E',
          marginBottom: '0.75rem',
          letterSpacing: '0.08em',
        }}
      >
        {label}
      </div>
      <div style={style}>{text}</div>
    </div>
  );
}

// ── Main Tokens Page ──────────────────────────────────────
function DesignTokensPage() {
  return (
    <div
      style={{
        fontFamily: "'Raleway', sans-serif",
        padding: '2rem',
        maxWidth: 1100,
        background: '#FDFAF5',
        minHeight: '100vh',
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Raleway:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <div style={{ marginBottom: '3rem', borderBottom: '2px solid #C4975A', paddingBottom: '1.5rem' }}>
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#7C9070',
            marginBottom: '0.5rem',
          }}
        >
          Design System
        </div>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2.5rem',
            fontWeight: 400,
            color: '#1C1810',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Heal With Amy
          <span style={{ color: '#C4975A', marginLeft: '0.5rem' }}>✦</span>
        </h1>
        <p style={{ color: '#6B5B45', marginTop: '0.5rem', fontSize: '0.9rem' }}>
          Brand design tokens — colors, typography, spacing, and components.
        </p>
      </div>

      {/* ── COLORS ── */}
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#1C1810', marginBottom: '1.5rem', fontWeight: 400 }}>
        Colors
      </h2>

      <Group label="Base / Backgrounds">
        <Swatch name="Cream"      cssVar="--cream"      hex="#FDFAF5" />
        <Swatch name="Cream Dark" cssVar="--cream-dark" hex="#F5EFE4" />
        <Swatch name="Parchment"  cssVar="--parchment"  hex="#EDE4D6" />
      </Group>

      <Group label="Brown / Text">
        <Swatch name="Brown"       cssVar="--brown"       hex="#1C1810" textDark={false} />
        <Swatch name="Brown Mid"   cssVar="--brown-mid"   hex="#3A3020" textDark={false} />
        <Swatch name="Brown Light" cssVar="--brown-light" hex="#6B5B45" textDark={false} />
      </Group>

      <Group label="Sage / Green">
        <Swatch name="Sage"       cssVar="--sage"       hex="#7C9070" textDark={false} />
        <Swatch name="Sage Dark"  cssVar="--sage-dark"  hex="#5A6E51" textDark={false} />
        <Swatch name="Sage Light" cssVar="--sage-light" hex="#A8BBA0" />
      </Group>

      <Group label="Gold / Accent">
        <Swatch name="Gold"      cssVar="--gold"       hex="#C4975A" textDark={false} />
        <Swatch name="Gold Light" cssVar="--gold-light" hex="#DBBF8C" />
        <Swatch name="Gold Pale"  cssVar="--gold-pale"  hex="#F0E3CB" />
      </Group>

      <Group label="Muted / Utility">
        <Swatch name="Muted" cssVar="--muted" hex="#9C8E7E" />
      </Group>

      {/* ── TYPOGRAPHY ── */}
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#1C1810', margin: '3rem 0 1.5rem', fontWeight: 400 }}>
        Typography
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
        <TypeSample
          label="Display / --font-display: 'Cormorant Garamond'"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 400, color: '#1C1810', lineHeight: 1.1 }}
          text="Reconnect with your energy."
        />
        <TypeSample
          label="Display Italic"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 400, fontStyle: 'italic', color: '#5A6E51', lineHeight: 1.1 }}
          text="Return to yourself."
        />
        <TypeSample
          label="H2 — Section heading"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 400, color: '#1C1810' }}
          text="Choose your healing path"
        />
        <TypeSample
          label="H3 — Card / sub-heading"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 500, color: '#1C1810' }}
          text="Custom Healing Session"
        />
        <TypeSample
          label="Body / --font-body: 'Raleway'"
          style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', fontWeight: 400, color: '#6B5B45', lineHeight: 1.85 }}
          text="Intuitive energy healing sessions and experiential classes to help you feel grounded, clear, and deeply connected to yourself."
        />
        <TypeSample
          label="Tag / Label — uppercase tracking"
          style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#5A6E51' }}
          text="Energy Healing · Mentorship · Transformation"
        />
        <TypeSample
          label="Price — large display number"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 500, color: '#1C1810', lineHeight: 1 }}
          text="$111"
        />
      </div>

      {/* ── SPACING SCALE ── */}
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#1C1810', margin: '3rem 0 1.5rem', fontWeight: 400 }}>
        Spacing Scale
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '3rem' }}>
        {[4, 8, 12, 16, 24, 32, 48, 64, 80, 112].map((px) => (
          <div key={px} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                background: '#C4975A',
                height: 20,
                width: px,
                borderRadius: 2,
                flexShrink: 0,
              }}
            />
            <code style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#6B5B45' }}>
              {px}px — {(px / 16).toFixed(3)}rem
            </code>
          </div>
        ))}
      </div>

      {/* ── BORDER RADIUS ── */}
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#1C1810', margin: '3rem 0 1.5rem', fontWeight: 400 }}>
        Border Radius
      </h2>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        {[
          { label: 'none — 0px', radius: 0 },
          { label: 'sm — 2px', radius: 2 },
          { label: 'md — 6px', radius: 6 },
          { label: 'lg — 12px', radius: 12 },
          { label: 'full — 9999px', radius: 9999 },
        ].map(({ label, radius }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                width: 64,
                height: 64,
                background: '#EDE4D6',
                border: '2px solid #C4975A',
                borderRadius: radius,
              }}
            />
            <code style={{ fontFamily: 'monospace', fontSize: '0.62rem', color: '#9C8E7E', textAlign: 'center' }}>
              {label}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Storybook Meta ────────────────────────────────────────
const meta: Meta = {
  title: 'Design System/Design Tokens',
  component: DesignTokensPage,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'cream' },
    docs: { description: { component: 'Complete brand design token reference for Heal With Amy.' } },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const AllTokens: Story = {
  name: 'All Tokens',
};
