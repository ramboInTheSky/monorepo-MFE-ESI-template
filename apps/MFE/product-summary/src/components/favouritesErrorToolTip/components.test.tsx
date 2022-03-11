import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {
    Container,
    ErrorContainer,
    Header,
    Title,
    CloseButton,
    Content,
    ShoppingLink,
    ManageFavouritesButton,
} from "./components"

describe("Given a FavouritesToolTip - Container", () => {
    it("should render as expected", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <Container />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a FavouritesToolTip - ErrorContainer", () => {
    it("should render as expected", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ErrorContainer />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a FavouritesToolTip - Header", () => {
    it("should render as expected", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <Header />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a FavouritesToolTip - Title", () => {
    it("should render as expected", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <Title />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a FavouritesToolTip - CloseButton", () => {
    it("should render as expected", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <CloseButton />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a FavouritesToolTip - Content", () => {
    it("should render as expected", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <Content />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a FavouritesToolTip - ShoppingLink", () => {
    it("should render as expected", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ShoppingLink />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a FavouritesToolTip - ManageFavouritesButton", () => {
    it("should render as expected", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ManageFavouritesButton />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
