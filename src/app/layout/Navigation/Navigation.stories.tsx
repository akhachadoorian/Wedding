import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation';


const meta: Meta<typeof Navigation> = {
    component: Navigation,
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

type Story = StoryObj<typeof Navigation>;

export const Default: Story = {
    args: {
        
    }
}
