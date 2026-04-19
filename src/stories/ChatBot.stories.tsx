import type { Meta, StoryObj } from '@storybook/react';
import ChatBot from '../components/ChatBot';

/* ─────────────────────────────────────────────────────────
   CHATBOT — Heal With Amy
   Floating React chat widget. Answers FAQ about services,
   pricing, booking, Amy's background, and locations.
   ───────────────────────────────────────────────────────── */

const meta: Meta<typeof ChatBot> = {
  title: 'Components/ChatBot',
  component: ChatBot,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'cream' },
    docs: {
      description: {
        component:
          'Floating chat widget with rule-based FAQ responses. Renders as a toggle button (bottom-right) that opens a chat window. Pre-answers questions about pricing, booking, services, Amy\'s background, and locations.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChatBot>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: '#FDFAF5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Raleway', sans-serif",
        color: '#6B5B45',
        fontSize: '0.9rem',
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Raleway:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <p>Click the chat button in the bottom-right corner ↘</p>
      <ChatBot />
    </div>
  ),
  name: 'Live Widget',
};
