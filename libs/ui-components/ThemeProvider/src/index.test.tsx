import React from "react"
import {render} from "@testing-library/react"
import styled from "styled-components"
import {mockColors as mockThemeColor} from "@monorepo/themes"
import AmidoThemeProvider, {SCThemeProvider} from "."

const H2 = styled.h2``

describe("Common - AmidoThemeProvider: ", () => {
    it("should match the snapshot template", () => {
        const {asFragment} = render(
            <AmidoThemeProvider themeColor={mockThemeColor} classname="TestClassName" textAlignment="ltr">
                <H2>Text</H2>
            </AmidoThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("When RTL, it should match the snapshot template", () => {
        const {asFragment} = render(
            <AmidoThemeProvider themeColor={mockThemeColor} classname="TestClassName" textAlignment="rtl">
                <H2>Text</H2>
            </AmidoThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Common - SCThemeProvider: ", () => {
    it("should match the snapshot template", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockThemeColor}>
                <H2>Text</H2>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
