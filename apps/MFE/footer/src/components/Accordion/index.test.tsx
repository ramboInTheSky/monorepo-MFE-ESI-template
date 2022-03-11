import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"
import {AccordionComponent} from "."

jest.mock("@monorepo/accordion", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: ({arrowIconUrl}) => (
        <div>
            Accordion <img src={arrowIconUrl} alt="arrow" />
        </div>
    ),
}))

describe("Components - Accordion: ", () => {
    const props = {
        titleColor: "#000",
        border: "1px solid #000",
        arrowIconUrl: `/superman/icons/shared/chevron.svg`,
        title: "Help",
        siteUrl: "http://amido.com",
    }
    it("should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <AccordionComponent {...props}>
                    <p>YES</p>
                </AccordionComponent>
            </SCThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
