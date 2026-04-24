import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import ImageGrid from './ImageGrid';

const meta: Meta<typeof ImageGrid> = {
    component: ImageGrid,
    tags: ['autodocs'],
    decorators: [
        (Story: React.ComponentType) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],

};
export default meta;

type Story = StoryObj<typeof ImageGrid>;

export const Default: Story = {
    args: {
        
    }
}

