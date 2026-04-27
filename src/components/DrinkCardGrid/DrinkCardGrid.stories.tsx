import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import DrinkCardGrid, { DrinkCardProps } from './DrinkCardGrid';

const meta: Meta<typeof DrinkCardGrid> = {
    component: DrinkCardGrid,
    tags: ['autodocs'],
    decorators: [
        (Story: React.ComponentType) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
};
export default meta;

type Story = StoryObj<typeof DrinkCardGrid>;

const defaultCard = {
    eyebrow: "Lorem ipsum",
    title: "Lorem ipsum dolor sit amet",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    link: '/',
    target: '_self' as const,
};


const makeCards = (drinksPerCard: DrinkCardProps['drinks'][]) =>
    drinksPerCard.map(drinks => ({ ...defaultCard, drinks }));




export const Default: Story = {
    args: { drinkCards: [{
        ...defaultCard,
        drinks: [
            { type: 'cocktail', rotate: 'small', rotateNeg: false, hoverHeight: 'low' },
            { type: 'coupe',    rotate: 'medium', rotateNeg: true,  hoverHeight: 'high' },
        ]
    }]},
};


export const ThreeCards: Story = {
    args: { drinkCards: makeCards([
        [{ type: 'cocktail', rotate: 'small',  rotateNeg: false, hoverHeight: 'low'    }, { type: 'coupe',   rotate: 'medium', rotateNeg: true, hoverHeight: 'high' }],
        [{ type: 'martini',  rotate: 'large',  rotateNeg: true,  hoverHeight: 'medium' }, { type: 'whiskey', rotate: 'small',  rotateNeg: false, hoverHeight: 'low'  }],
        [{ type: 'highball', rotate: 'medium', rotateNeg: false, hoverHeight: 'high'   }, { type: 'cocktail',rotate: 'large',  rotateNeg: true, hoverHeight: 'medium'}],
    ])},
};


export const FiveCards: Story = {
    args: { drinkCards: makeCards([
        [{ type: 'cocktail', rotate: 'small',  rotateNeg: false, hoverHeight: 'low'    }, { type: 'coupe',   rotate: 'medium', rotateNeg: true, hoverHeight: 'high' }],
        [{ type: 'martini',  rotate: 'large',  rotateNeg: true,  hoverHeight: 'medium' }, { type: 'whiskey', rotate: 'small',  rotateNeg: false, hoverHeight: 'low'  }],
        [{ type: 'highball', rotate: 'medium', rotateNeg: false, hoverHeight: 'high'   }, { type: 'cocktail',rotate: 'large',  rotateNeg: true, hoverHeight: 'medium'}],
        [{ type: 'wine', rotate: 'large', rotateNeg: true, hoverHeight: 'high'   }, { type: 'shaker',rotate: 'small',  rotateNeg: true, hoverHeight: 'medium'}],
        [{ type: 'margarita', rotate: 'medium', rotateNeg: false, hoverHeight: 'high'   }, { type: 'glass',rotate: 'large',  rotateNeg: true, hoverHeight: 'medium'}],
    ])},
};
