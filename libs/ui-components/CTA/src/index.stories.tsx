import React from "react"
import styled, {ThemeProvider} from "styled-components"
import {mockTheme} from "@monorepo/themes"
import {CTA} from "."

const CTAContainer = styled.div`
    max-width: 18rem;
`

export default {
    title: "CTA",
    component: CTA,
    decorators: [
        Story => (
            <ThemeProvider theme={mockTheme}>
                <CTAContainer>
                    <Story />
                </CTAContainer>
            </ThemeProvider>
        ),
    ],
    argTypes: {
        themeType: {
            control: {
                type: "select",
                options: ["Primary", "Secondary", "Tertiary"],
            },
            defaultValue: "Primary",
        },
        enable: true,
        text: "This is a CTA",
        url: "http://amido.com",
        testId: "test-id",
        dataGaV1: "dataGaV1",
        dataGaV2: "dataGaV2",
        dataGaV3: "dataGaV3",
        rel: "rel",
        onClick: () => null,
    },
}

const Template = args => <CTA {...args} />

export const CTAExample = Template.bind({})
CTAExample.args = {
    enable: true,
    text: "This is a CTA",
    url: "http://amido.com",
    onClick: () => null,
    testId: "test-id",
    dataGaV1: "dataGaV1",
    dataGaV2: "dataGaV2",
    dataGaV3: "dataGaV3",
    rel: "rel",
}
