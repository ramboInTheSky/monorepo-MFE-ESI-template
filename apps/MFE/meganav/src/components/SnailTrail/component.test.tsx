import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {Container} from "./component"
import {mockTheme} from "../../../__mocks__/mockStore"

describe("SnailTrail component: ", () => {
    describe("Container: ", () => {
        it("should match the snapshot when loaded is false", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Container loaded={false} />{" "}
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Container loaded />{" "}
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
