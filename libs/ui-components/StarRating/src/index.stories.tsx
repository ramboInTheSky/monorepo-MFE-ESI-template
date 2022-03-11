import React from "react"
import {StarRating} from "."

export default {
    title: "Star Rating",
    component: StarRating,
    argTypes: {
        value: 2.5,
        countValue: 100,
        starFilledColour: { control: 'color' },
        starEmptyColour: { control: 'color' }
    },
}

const Template = args => <StarRating {...args} />

export const StarRatingExample = Template.bind({})
StarRatingExample.args = {
    value: 2.5,
    countValue: 100
}

export const StarRatingNoCountExample = Template.bind({})
StarRatingNoCountExample.args = {
    value: 2.5
}
