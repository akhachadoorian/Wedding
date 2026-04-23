import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';


const meta: Meta<typeof Footer> = {
    component: Footer,
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

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
    args: {
        
    }
}
