import type { Meta, StoryObj } from '@storybook/react';

/* ─────────────────────────────────────────────────────────
   IMAGE ASSETS — Heal With Amy
   All scraped images from healwithamy.com, organized with
   their intended usage context and recommended crop/size.
   ───────────────────────────────────────────────────────── */

const IMAGES = [
  {
    file: '/images/hero-amy.jpeg',
    name: 'Amy — Profile (Hero)',
    usage: 'Hero section, About page portrait',
    size: '271×328 — portrait',
    originalId: 'b5ac46_f6da447379c64a53873a2a5487cd0a90~mv2.jpeg',
  },
  {
    file: '/images/amy-profile.jpg',
    name: 'Amy — Profile (Small)',
    usage: 'Favicon, nav, small profile placements',
    size: '70×70 — square',
    originalId: 'b5ac46_c942121848b3491b83c92afdc7215ea1~mv2.jpg',
  },
  {
    file: '/images/session-1.jpeg',
    name: 'Session Photo 1',
    usage: 'Homepage hero background, services page',
    size: '361×480 — portrait',
    originalId: '4200a8_d410c72114b84bc78198c5e391754a51~mv2.jpeg',
  },
  {
    file: '/images/session-2.jpg',
    name: 'Session Photo 2 (IMG_3256)',
    usage: 'Homepage services section, about page',
    size: '525×375 — landscape',
    originalId: '4200a8_ac9d41a3245740928cfbd1057ad4583b~mv2.jpg',
  },
  {
    file: '/images/river-mountain.jpg',
    name: 'River & Mountain',
    usage: 'Services page background, mentorship section',
    size: '423×528 — portrait',
    originalId: '11062b_9ca28b232a954bb4b58a9115f1748584~mv2.jpg',
  },
  {
    file: '/images/meditation.jpg',
    name: 'Meditation Pose',
    usage: 'Services/about page — classes & experiences',
    size: '428×364 — landscape',
    originalId: '11062b_5c6bff5eeb0b4f3eaf75a996cf0a3d21~mv2.jpg',
  },
  {
    file: '/images/meditation-silhouette.jpg',
    name: 'Meditation Silhouette',
    usage: 'Hero overlay, testimonials page, CTA sections',
    size: '428×363 — landscape',
    originalId: '11062b_2f1491e25ba448de9c12ef792c3d4c5b~mv2.jpg',
  },
];

function ImageGallery() {
  return (
    <div
      style={{
        padding: '2rem',
        background: '#FDFAF5',
        fontFamily: "'Raleway', sans-serif",
        minHeight: '100vh',
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,400&family=Raleway:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div style={{ marginBottom: '2.5rem', borderBottom: '2px solid #C4975A', paddingBottom: '1.5rem' }}>
        <div style={{ fontFamily: 'monospace', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7C9070', marginBottom: '0.4rem' }}>
          Design System
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 400, color: '#1C1810', margin: 0 }}>
          Image Assets <span style={{ color: '#C4975A' }}>✦</span>
        </h1>
        <p style={{ color: '#6B5B45', marginTop: '0.4rem', fontSize: '0.85rem' }}>
          All {IMAGES.length} images scraped from healwithamy.com — stored in <code style={{ background: '#EDE4D6', padding: '0.1em 0.4em', borderRadius: 3 }}>/public/images/</code>
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {IMAGES.map((img) => (
          <div
            key={img.file}
            style={{
              border: '1px solid #EDE4D6',
              borderRadius: 6,
              overflow: 'hidden',
              background: '#fff',
            }}
          >
            {/* Image */}
            <div
              style={{
                height: 200,
                background: '#F5EFE4',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={img.file}
                alt={img.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML =
                    '<div style="color:#9C8E7E;font-size:0.75rem;text-align:center;padding:1rem">Image not found</div>';
                }}
              />
            </div>

            {/* Info */}
            <div style={{ padding: '1rem' }}>
              <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#1C1810', marginBottom: '0.35rem' }}>
                {img.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#5A6E51', marginBottom: '0.25rem' }}>
                📌 {img.usage}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#9C8E7E', marginBottom: '0.5rem' }}>
                {img.size}
              </div>
              <code
                style={{
                  display: 'block',
                  fontFamily: 'monospace',
                  fontSize: '0.65rem',
                  background: '#F5EFE4',
                  padding: '0.35rem 0.6rem',
                  borderRadius: 3,
                  color: '#6B5B45',
                  wordBreak: 'break-all',
                }}
              >
                {img.file}
              </code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Design System/Image Assets',
  component: ImageGallery,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'cream' },
    docs: {
      description: {
        component: 'All images scraped from healwithamy.com, with recommended usage context for each page.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const AllImages: Story = {
  name: 'All Images',
};
