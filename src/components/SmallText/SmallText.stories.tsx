import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import SmallText from './SmallText';


const meta: Meta<typeof SmallText> = {
    component: SmallText,
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

type Story = StoryObj<typeof SmallText>;

export const Left: Story = {
    args: {
        eyebrow: "Lorem ipsum",
        title: "Lorem ipsum",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        variation: "left"
    }
}

export const Center: Story = {
    args: {
        eyebrow: "Lorem ipsum",
        title: "Lorem ipsum",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        variation: "center"
    }
}

export const Right: Story = {
    args: {
        eyebrow: "Lorem ipsum",
        title: "Lorem ipsum",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        variation: "right"
    }
}