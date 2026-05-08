import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import HomeHero from './HomeHero';

const meta: Meta<typeof HomeHero> = {
    component: HomeHero,
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

type Story = StoryObj<typeof HomeHero>;

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
