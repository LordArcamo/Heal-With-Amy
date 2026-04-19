import type { Preview } from '@storybook/react';

// Import the global styles so all stories share the design tokens
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'cream',
      values: [
        { name: 'cream',      value: '#FDFAF5' },
        { name: 'cream-dark', value: '#F5EFE4' },
        { name: 'parchment',  value: '#EDE4D6' },
        { name: 'brown',      value: '#1C1810' },
        { name: 'white',      value: '#FFFFFF' },
      ],
    },
    layout: 'padded',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
