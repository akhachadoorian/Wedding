import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import Button from "./Button";

const meta: Meta<typeof Button> = {
    title: "Components/Buttons",
    component: Button,
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

type Story = StoryObj<typeof Button>;

export const Solid: Story = {
    args: {
        style: "solid",
        theme: "gold",
        btnSettings: {
            text: "View Details",
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
            text: "View Details",
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
            text: "View Details",
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
            text: "View Details",
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
            text: "View Details",
            link: "/details",
        },
        includeArrow: true,
        arrowSettings: {
            arrowDirection: 'left',
            arrowSide: 'left'
        }
    },
};