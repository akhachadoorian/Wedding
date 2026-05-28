import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Accordions from './Accordions';


const meta: Meta<typeof Accordions> = {
    component: Accordions,
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

type Story = StoryObj<typeof Accordions>;

export const Left: Story = {
    args: {
        eyebrow: "Lorem ipsum",
        title: "Lorem ipsum",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    }
}
