// import './preview.css';
import type { Preview } from '@storybook/react-webpack5'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark',  value: '#1a1a1a' },
        { name: 'cream', value: '#f5f0e8' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
};

export default preview;