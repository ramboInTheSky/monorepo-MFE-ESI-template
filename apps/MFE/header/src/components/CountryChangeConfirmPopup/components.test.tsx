import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../__mocks__/mockStore"
import {
    Container,
    StyledTitle,
    StyledText,
    StyledButtonWrapper,
    StyledButtonConfirm,
    StyledButtonCancel,
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

describe("StyledTitle component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <StyledTitle variant="h5">Title</StyledTitle>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("StyledText component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <StyledText variant="h5">Text</StyledText>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("StyledButtonWrapper component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <StyledButtonWrapper />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("StyledButtonConfirm component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <StyledButtonConfirm>Continue</StyledButtonConfirm>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("StyledButtonCancel component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <StyledButtonCancel>Cancel</StyledButtonCancel>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
