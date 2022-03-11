import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {FavouritesContainer, FavouritesIcon} from "./components"

describe("Given a FavouritesContainer - FavouritesContainer", () => {
    it("should render as expected when it is Active", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <FavouritesContainer />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should render as expected  when it is Loading", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <FavouritesContainer />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a FavouritesIcon - FavouritesIcon", () => {
    it("should render as expected when favState is inactive", () => {
        const {asFragment} = render(<FavouritesIcon favState="inactive" shouldAnimate/>)
        expect(asFragment()).toMatchSnapshot()
    })
    it("should render as expected when favState is loading", () => {
        const {asFragment} = render(<FavouritesIcon favState="loading" shouldAnimate/>)
        expect(asFragment()).toMatchSnapshot()
    })
    it("should render as expected when favState is active", () => {
        const {asFragment} = render(<FavouritesIcon favState="active" shouldAnimate/>)
        expect(asFragment()).toMatchSnapshot()
    })
})
