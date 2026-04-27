import React from "react";
import { MemoryRouter } from "react-router-dom";

import MediaWithCopy from "./MediaWithCopy";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof MediaWithCopy> = {
    component: MediaWithCopy,
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

type Story = StoryObj<typeof MediaWithCopy>;

export const Left: Story = {
    args: {
        mediaSide: 'left',
        eyebrow: "Lorem ipsum",
        header: "Lorem ipsum dolor sit amet.",
        subtitle: "Lorem ipsum dolor sit amet",
        body: "**Lorem ipsum** dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus." ,
        buttons: [
            {
                btnText: "B1",
                link: "/",
            },
            {
                btnText: "B2",
                link: "/",
            },
        ],
    },
};

export const Right: Story = {
    args: {
        mediaSide: 'right',
        eyebrow: "Lorem ipsum",
        header: "Lorem ipsum dolor sit amet.",
        subtitle: "Lorem ipsum dolor sit amet",
        body: "**Lorem ipsum** dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus." ,
        buttons: [
            {
                btnText: "B1",
                link: "/",
            },
            {
                btnText: "B2",
                link: "/",
            },
        ],
    },
};
