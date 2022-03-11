import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../__mocks__/mockStore"
import {
    Container,
    CountryFlagImg,
    CloseButton,
    CountrySelectorContainerLanguageButtons,
    StyledIcon,
    StayText,
} from "./component"

describe("Container component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <Container />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("CountryFlagImg component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <CountryFlagImg src="/abc/abe.jpg" alt="image" />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("CloseButton component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <CloseButton />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("CountrySelectorContainerLanguageButtons component: ", () => {
    it("should match the snapshot if selected", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <CountrySelectorContainerLanguageButtons selected />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot if not selected", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <CountrySelectorContainerLanguageButtons selected={false} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("StyledIcon component: ", () => {
    it("should match the snapshot when rtl", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <StyledIcon textAlignment="rtl" />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot when ltr", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <StyledIcon textAlignment="ltr" />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("StayText component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <StayText />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
