import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../__mocks__/mockStore"
import {Container, Image} from "./component"

describe("MissionsCTA components: ", () => {
    describe("Container: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Container />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("Image: ", () => {
        it("should match the snapshot when text alignment is LTR", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Image alignment="ltr" />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
        it("should match the snapshot when text alignment is RTL", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Image alignment="rtl" />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
