import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../__mocks__/mockStore"
import {OuterContainer, OuterContainerProps} from "./component"

describe("UpperHeader component: ", () => {
    describe("Container: ", () => {
        it("should match the snapshot on desktop", () => {
            const props: OuterContainerProps = {
                hide: false,
                isMobile: false,
            }
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <OuterContainer {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
        it("should match the snapshot on mobile when scrolling", () => {
            const props: OuterContainerProps = {
                hide: true,
                isMobile: true,
            }
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <OuterContainer {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
        it("should match the snapshot on desktop when scrolling", () => {
            const props: OuterContainerProps = {
                hide: true,
                isMobile: false,
            }
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <OuterContainer {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
