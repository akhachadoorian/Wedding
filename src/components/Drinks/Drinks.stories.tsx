import React from "react";
import { MemoryRouter } from "react-router-dom";

import Drinks from "./Drinks";
import type { Meta, StoryObj } from "@storybook/react";
import { ResponsiveClampSize } from "../../types/size";

const meta: Meta<typeof Drinks> = {
    component: Drinks,
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

type Story = StoryObj<typeof Drinks>;


const defaultSize = {
    size: {
        minSize: 300,
        desiredSize: 350,
        maxSize: 400
    }
} as ResponsiveClampSize;

export const Cocktail: Story = {
    args: {
        type: "cocktail",
        size: defaultSize,
        sizeHeight: true
    },
};

export const Coupe: Story = {
    args: {
        type: "coupe",
        size: defaultSize,
        sizeHeight: true
    },
};

export const Glass: Story = {
    args: {
        type: "glass",
        size: defaultSize,
        sizeHeight: true
    },
};

export const Highball: Story = {
    args: {
        type: "highball",
        size: defaultSize,
        sizeHeight: true
    },
};

export const Margarita: Story = {
    args: {
        type: "martini",
        size: defaultSize,
        sizeHeight: true
    },
};

export const Martini: Story = {
    args: {
        type: "martini",
        size: defaultSize,
        sizeHeight: true
    },
};

export const Shaker: Story = {
    args: {
        type: "shaker",
        size: defaultSize,
        sizeHeight: true
    },
};

export const Whiskey: Story = {
    args: {
        type: "whiskey",
        size: defaultSize,
        sizeHeight: true
    },
};

export const Wine: Story = {
    args: {
        type: "wine",
        size: defaultSize,
        sizeHeight: true
    },
};
