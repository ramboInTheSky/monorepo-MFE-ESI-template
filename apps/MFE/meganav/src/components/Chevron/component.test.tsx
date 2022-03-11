import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {Container, Gradient} from "./component"
import {mockTheme} from "../../../__mocks__/mockStore"

describe("SnailTrail component: ", () => {
    describe("Container: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Container doRotate />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("Gradient: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Gradient flip={false} isShown />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })

        it("when true, it should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Gradient flip isShown />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
