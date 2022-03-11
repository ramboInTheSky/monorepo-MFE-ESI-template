import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"
import {ButtonContainer, OpenFiltersButton} from "./components"
import dimensions from "../../../__mocks__/themeDimensions.json"

const mockThemeEnhanced = {...mockTheme, dimensions}

describe("Filters Components", () => {
    test("ButtonContainer", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockThemeEnhanced}>
                <ButtonContainer>Test</ButtonContainer>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("OpenFiltersButton", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockThemeEnhanced}>
                <OpenFiltersButton>Test</OpenFiltersButton>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
