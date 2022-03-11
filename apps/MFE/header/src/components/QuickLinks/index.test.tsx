import React from "react"
import {render, cleanup} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {Provider} from "react-redux"
import Quicklinks, {QuickLinksProps} from "."
import DefaultQuickLink from "../QuickLink/templates/default-template"
import mockStore, {mockTheme} from "../../../__mocks__/mockStore"

const props: QuickLinksProps = {
    quickLinks: [
        {
            text: "help",
            url: "spiderman/help",
            accessibilityText: "help",
            icon: "/stores.svg",
            componentName: DefaultQuickLink,
        },
    ],
}

describe("Components - QuickLinks: ", () => {
    afterEach(() => {
        cleanup()
    })
    it("should match the snapshot", () => {
        const {asFragment} = render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <Quicklinks {...props} />
                </SCThemeProvider>
            </Provider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
