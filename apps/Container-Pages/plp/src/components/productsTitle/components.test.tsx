import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {
    StyledProductTitle,
    StyledCount,
    StyledTextWrapper,
    StyledSecondaryText,
    StyledCapitalizedText,
} from "./components"

describe("Snapshots - products title", () => {
    test("StyledProductTitle", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <StyledProductTitle>Test</StyledProductTitle>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    test("StyledCount", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <StyledCount>Test</StyledCount>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    test("StyledTextWrapper", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <StyledTextWrapper>Test</StyledTextWrapper>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    test("StyledSecondaryText", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <StyledSecondaryText>Test</StyledSecondaryText>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    test("StyledCapitalizedText", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <StyledCapitalizedText>Test</StyledCapitalizedText>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
