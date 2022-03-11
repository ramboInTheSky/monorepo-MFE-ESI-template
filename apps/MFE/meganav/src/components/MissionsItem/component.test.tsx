import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {Container, ImageContainer, ImageTitle} from "./component"
import {mockTheme} from "../../../__mocks__/mockStore"

describe("MissionsItem components: ", () => {
    describe("Container: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<Container numberOfColumns={3} />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("Image Container: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <ImageContainer />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("Image Title: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <ImageTitle />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
