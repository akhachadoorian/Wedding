import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Note from './Note';


const meta: Meta<typeof Note> = {
    component: Note,
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

type Story = StoryObj<typeof Note>;

export const Left: Story = {
    args: {
        title: "Lorem ipsum",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        variation: "left"
    }
}

export const Center: Story = {
    args: {
        variation: 'center',
        icon: 'warning',
        title: "Lorem ipsum",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    }
}

export const BodyOnly: Story = {
    args: {
        variation: 'left',
        icon: 'question',
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    }
}