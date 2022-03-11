import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {Provider} from "react-redux"
import {TabsScroll} from "."
import mockStore, {mockTheme} from "../../../__mocks__/mockStore"

describe("Components - TabsScroll: ", () => {
    let props
    beforeEach(() => {
        const ref = {
            current: {
                getBoundingClientRect: () => {
                    return {left: 0, width: 10}
                },
            },
        }
        props = {forwardedRef: ref}
    })
    it("should match the snapshot", () => {
        const {asFragment} = render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <TabsScroll {...props}>null</TabsScroll>
                </SCThemeProvider>
            </Provider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("when rtl, it should match the snapshot", () => {
        const {asFragment} = render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <TabsScroll dir="rtl" {...props}>
                        null
                    </TabsScroll>
                </SCThemeProvider>
            </Provider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
