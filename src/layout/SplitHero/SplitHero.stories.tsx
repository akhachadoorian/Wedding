import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import SplitHero from './SplitHero';

const meta: Meta<typeof SplitHero> = {
    component: SplitHero,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story: React.ComponentType) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
};
export default meta;

type Story = StoryObj<typeof SplitHero>;

export const Hero: Story = {
    args: {
        loaded: true,
        heading: {
            line1: "Heading Line 1"
        },
        eyebrow: {
            text: 'Eyebrow'
        },
        btn: {
            btnText: "Button",
            link: "/"
        },
        
    }
}
