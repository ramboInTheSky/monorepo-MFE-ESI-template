import React from "react"
import { render } from "@testing-library/react"
import { ThemeProvider } from "styled-components"
import { StarRatingWrapper } from "./components"
import { mockTheme, centralisedMockTheme } from "../../../__mocks__/mockStore"

describe("Given a StarRatingWrapper component", () => {
    it("should render the component correctly to match the snapshot", () => {
        const { asFragment } = render(<ThemeProvider theme={mockTheme}><StarRatingWrapper /></ThemeProvider>)

        expect(asFragment()).toMatchSnapshot()
    })
    it("should render the component correctly to match the centralised snapshot", () => {
        const { asFragment } = render(<ThemeProvider theme={centralisedMockTheme}><StarRatingWrapper /></ThemeProvider>)

        expect(asFragment()).toMatchSnapshot()
    })
})
