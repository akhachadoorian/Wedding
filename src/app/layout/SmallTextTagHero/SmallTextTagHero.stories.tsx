import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import SmallTextTagHero from './SmallTextTagHero';

const meta: Meta<typeof SmallTextTagHero> = {
    component: SmallTextTagHero,
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

type Story = StoryObj<typeof SmallTextTagHero>;

export const Hero: Story = {
    args: {

        
    }
}
