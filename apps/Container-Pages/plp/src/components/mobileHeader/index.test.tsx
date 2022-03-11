import React from "react"
import {render, cleanup} from "@testing-library/react"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {MobileHeader} from "."

jest.mock("../mobileSort", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST SORT</div>,
}))

jest.mock("../showFilters", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST FILTER</div>,
}))

jest.mock("@mui/material/useScrollTrigger", () => ({
    default: jest.fn().mockReturnValue(true),
    __esModule: true,
}))

describe("MobileHeader: ", () => {
    afterEach(() => {
        cleanup()
    })

    it("should call useScrollTriger with the right values", () => {
        render(
            <ThemeProvider theme={mockTheme}>
                <MobileHeader />
            </ThemeProvider>,
        )

        expect(useScrollTrigger).toHaveBeenCalledWith({
            threshold: 44,
        })
    })

    it("should match the snapshot", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <MobileHeader />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
