import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "@monorepo/themes"
import {CountryFlagImg, CloseButton, CountrySelectorContainerLanguageButtons, StyledIcon, StayText} from "./components"

describe("CountryFlagImg component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <CountryFlagImg src="/abc/abe.jpg" alt="image" />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("CloseButton component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <CloseButton>Text</CloseButton>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("CountrySelectorContainerLanguageButtons component: ", () => {
    it("should match the snapshot if selected", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <CountrySelectorContainerLanguageButtons selected />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot if not selected", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <CountrySelectorContainerLanguageButtons selected={false} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("StyledIcon component: ", () => {
    it("should match the snapshot when rtl", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <StyledIcon textAlignment="rtl" />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot when ltr", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <StyledIcon textAlignment="ltr" />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("StayText component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <StayText />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
