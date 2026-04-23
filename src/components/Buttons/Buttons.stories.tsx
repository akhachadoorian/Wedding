import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import Buttons from "./Buttons";

const meta: Meta<typeof Buttons> = {
    title: "Components/Buttons",
    component: Buttons,
    tags: ["autodocs"],
    decorators: [
        (Story: React.ComponentType) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
};
export default meta;

type Story = StoryObj<typeof Buttons>;

export const Solid: Story = {
    args: {
        style: "solid",
        theme: "gold",
        btnSettings: {
            btnText: "View Details",
            link: "/details",
        },
        includeArrow: true,
        arrowSettings: {
            arrowDirection: 'top-right',
            arrowSide: 'right'
        }
    },
};

export const Outline: Story = {
    args: {
        style: "outline",
        theme: "cream",
        btnSettings: {
            btnText: "View Details",
            link: "/details",
        },
        includeArrow: true,
        arrowSettings: {
            arrowDirection: 'top-right',
            arrowSide: 'right'
        }
    },
};

export const Lines: Story = {
    args: {
        style: "lines",
        theme: "gold",
        btnSettings: {
            btnText: "View Details",
            link: "/details",
        },
        includeArrow: true,
        arrowSettings: {
            arrowDirection: 'top-right',
            arrowSide: 'right'
        }
    },
};

export const NoArrow: Story = {
    args: {
        style: "solid",
        theme: "cream",
        btnSettings: {
            btnText: "View Details",
            link: "/details",
        },
        includeArrow: false,
    },
};

export const LeftArrow: Story = {
    args: {
        style: "solid",
        theme: "cream",
        btnSettings: {
            btnText: "View Details",
            link: "/details",
        },
        includeArrow: true,
        arrowSettings: {
            arrowDirection: 'left',
            arrowSide: 'left'
        }
    },
};