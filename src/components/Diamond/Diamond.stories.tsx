import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Diamond from './Diamond';

const meta: Meta<typeof Diamond> = {
    component: Diamond,
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

type Story = StoryObj<typeof Diamond>;

export const Default: Story = {
    args: {
        color: "--gold-500",
        size: {
            size: {
                minSize: 16,
                desiredSize: 16,
                maxSize: 20
            }
        }
    }
}

export const CreamLarge: Story = {
    args: {
        color: "--cream-500",
        size: {
            size: {
                minSize: 50,
                desiredSize: 55,
                maxSize: 60
            }
        }
    }
}