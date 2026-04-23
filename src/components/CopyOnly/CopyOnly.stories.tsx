import React from "react";
import { MemoryRouter } from "react-router-dom";

import CopyOnly from "./CopyOnly";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CopyOnly> = {
    component: CopyOnly,
    tags: ["autodocs"],
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
        variation: "left",
        headingSize: "h2",
        eyebrow: "Lorem ipsum",
        header: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        subtitle: "Lorem ipsum dolor sit amet",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis viverra nunc, id bibendum magna vehicula sed. In facilisis cursus neque nec luctus.",
        buttons: [
            {
                btnText: "B1",
                link: "/",
            },
            {
                btnText: "B2",
                link: "/",
            },
            {
                btnText: "B3",
                link: "/",
            },
        ],
    },
};
