import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../../__mocks__/mockStore"
import {
    HeaderContainer,
    TitleContainerStyled,
    ContentContainerStyled,
    CloseIcon,
    ClearButton,
    Title,
} from "./components"

describe("Feature/Searchbar - enrich - components ", () => {
    describe("HeaderContainer: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <HeaderContainer />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("CloseIcon: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<CloseIcon />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("ClearButton: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <ClearButton />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("Title: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<Title />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("TitleContainerStyled: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<TitleContainerStyled />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("ContentContainerStyled: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<ContentContainerStyled />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
