import React from "react"

import Accordion from "."

export default {
    title: "Accordion",
    component: Accordion,
    argTypes: {
        title: "this is a title",
        titleColor: "hotpink",
        border: "1px solid black",
        arrowIconUrl: "https://xcdn.amido.com/content/platmod/icons/shared/chevron.svg",
        expanded: false,
        children: "this is the content",
        panelPadding: null,
    },
}

const Template = args => <Accordion {...args} />

export const AccordionExample = Template.bind({})
AccordionExample.args = {
    title: "this is a title",
    titleColor: "hotpink",
    border: "1px solid black",
    arrowIconUrl: "https://xcdn.amido.com/content/platmod/icons/shared/chevron.svg",
    expanded: false,
    children: "we are the world",
    panelPadding: "2rem",
}

export const AccordionVeryNice = Template.bind({})
AccordionVeryNice.args = {
    title: "this is a very nice title",
    titleColor: "green",
    border: "1px solid hotpink",
    arrowIconUrl: "https://xcdn.amido.com/content/platmod/icons/shared/chevron.svg",
    expanded: false,
    children: "we are the world",
    panelPadding: "0",
}
