import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import CopyOnly from './CopyOnly';


const meta: Meta<typeof CopyOnly> = {
    component: CopyOnly,
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

type Story = StoryObj<typeof CopyOnly>;

export const Left: Story = {
    args: {
        
    }
}
