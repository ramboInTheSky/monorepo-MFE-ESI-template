import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {Container, Header, Title, CloseButton, Content, Link, UserSection} from "./components"

describe("Given FavouritesToolTip", () => {
    describe("Given Container", () => {
        it("should render as expected", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <Container />
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given Header", () => {
        it("should render as expected", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <Header />
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given Title", () => {
        it("should render as expected", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <Title />
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given CloseButton", () => {
        it("should render as expected", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <CloseButton />
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given Content", () => {
        it("should render as expected", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <Content />
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given Link", () => {
        it("should render as expected", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <Link href="https://www.amido.com" />
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given UserSection", () => {
        it("should render as expected", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <UserSection />
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
