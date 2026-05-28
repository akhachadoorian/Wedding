import React from "react";
import { MemoryRouter } from "react-router-dom";

import DashedCopyGrid, { DashedCopy } from "./DashedCopy";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DashedCopyGrid> = {
    component: DashedCopyGrid,
    tags: ["autodocs"],
    decorators: [
        (Story: React.ComponentType) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
    globals: {
        backgrounds: { value: "black" },
    },
    parameters: {
        backgrounds: { default: 'dark' },
    },
};
export default meta;

type Story = StoryObj<typeof DashedCopyGrid>;

export const Single: Story = {
    args: {
        dashedCopy: [{ leftCopy: "Lorem ipsum dolor sit amet", rightCopy: "Lorem ipsum dolort" }],
    },
};

export const Multi: Story = {
    args: {
        dashedCopy: [
            { leftCopy: "Lorem ipsum ", rightCopy: "Lorem ipsum dolor sit amet" },
            { leftCopy: "Lorem", rightCopy: "Lorem ipsum dolor sit amet" },
            { leftCopy: "Lorem ipsum dolor sit", rightCopy: "Lorem" },
        ],
    },
};
