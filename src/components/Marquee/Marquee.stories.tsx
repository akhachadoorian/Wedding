import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Marquee from './Marquee';

const meta: Meta<typeof Marquee> = {
    component: Marquee,
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

type Story = StoryObj<typeof Marquee>;

export const Default: Story = {
    args: {
        
    }
}

