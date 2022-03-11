import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {
    DesktopSortContainer,
    StyledFormControl,
    StyledOutlinedInput,
    StyledInputLabel,
    StyledAutocomplete,
    StyledPopper,
} from "./components"

describe("Desktop Sort Components", () => {
    test("DesktopSortContainer", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <DesktopSortContainer>Test</DesktopSortContainer>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("StyledFormControl", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <StyledFormControl>Test</StyledFormControl>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("StyledAutocomplete", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <StyledAutocomplete renderInput={() => <div />} options={["test", "test2"]} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("StyledOutlinedInput", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <StyledOutlinedInput name="test" id="test" />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("StyledInputLabel", () => {
        const {asFragment} = render(<StyledInputLabel>Test</StyledInputLabel>)
        expect(asFragment()).toMatchSnapshot()
    })

    test("StyledPopper", () => {
        const isOpen = true
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <StyledAutocomplete
                    renderInput={() => <div />}
                    options={["test", "test2"]}
                    PopperComponent={children => (
                        <StyledPopper open={isOpen} transition>
                            {children}
                        </StyledPopper>
                    )}
                />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
