import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Eyebrow from './Eyebrow';


const meta: Meta<typeof Eyebrow> = {
    component: Eyebrow,
    tags: ['autodocs'],
    decorators: [
        (Story: React.ComponentType) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
    // argTypes: {

    // }
};
export default meta;

type Story = StoryObj<typeof Eyebrow>;

export const Left: Story = {
    args: {
        text: 'Eyebrow',
        color: '--gold-500',
        variation: 'left'
    }
}

export const Centered: Story = {
    args: {
        text: 'Eyebrow',
        color: '--cream-500',
        variation: 'centered'
    }
}

export const Double: Story = {
    args: {
        text: 'Line 1',
        doubleText: "Line 2",
        color: '--gold-500',
        variation: 'double'
    }
}