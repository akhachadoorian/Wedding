import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import ArrowBox, { ARROW_DIRECTIONS } from './ArrowBox';


const meta: Meta<typeof ArrowBox> = {
    component: ArrowBox,
    tags: ['autodocs'],
    decorators: [
        (Story: React.ComponentType) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
    // argTypes: {
    //     arrowDirection: {
    //         control: 'select',
    //         options: ['up', 'down', 'right', 'left', 'top-right', 'top-left', 'bottom-right', 'bottom-left'] satisfies ARROW_DIRECTIONS[],
    //     },
    // },
};
export default meta;

type Story = StoryObj<typeof ArrowBox>;

export const TopRight: Story = {
    args: {
        arrowDirection: 'top-right',
        color: "--cream-500"
    }
}

export const Left: Story = {
    args: {
        arrowDirection: 'left',
        color: "--gold-500"
    }
}
