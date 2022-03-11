import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "@monorepo/themes"
import {
    StyledSelect,
    StyledOutlinedInput,
    SelectedFormControl,
    SelectedMenuItem,
    StyledIcon,
    MenuItemCountryFlagImg,
} from "./component"

describe("StyledSelect component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(<StyledSelect />)
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("StyledOutlinedInput component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <StyledOutlinedInput />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("SelectedFormControl component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(<SelectedFormControl />)
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("SelectedMenuItem component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(<SelectedMenuItem />)
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("StyledIcon component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(<StyledIcon />)
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("MenuItemCountryFlagImg component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(<MenuItemCountryFlagImg />)
        expect(asFragment()).toMatchSnapshot()
    })
})
