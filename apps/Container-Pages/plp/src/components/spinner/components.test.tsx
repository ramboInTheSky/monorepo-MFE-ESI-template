import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {LoadingIconPrevNextPageContainer, LoadingIconContainer} from "./components"

describe("spinner components tests", () => {
    test("LoadingIconContainer", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <LoadingIconContainer />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("LoadingIconPrevNextPageContainer", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <LoadingIconPrevNextPageContainer />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
