import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {Image, ImageWrapper} from "./component"
import {mockTheme} from "../../../__mocks__/mockStore"

describe("Product Image Components: ", () => {
    describe("ImageWrapper ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<ImageWrapper />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("Image ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Image />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
