import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {Provider} from "react-redux"
import mockStore, {mockTheme} from "../../../__mocks__/mockStore"
import QuickLink, {QuickLinkProps} from "."
import DefaultQuickLink from "./templates/default-template"

describe("Components - QuickLink: ", () => {
    let props: QuickLinkProps

    jest.mock("../../config/constants", () => {
        return {
            __esModule: true,
            // eslint-disable-next-line @typescript-eslint/require-await
            NO_FOLLOW: "nofollow",
        }
    })

    beforeEach(() => {
        props = {
            url: "http://hello.com/help",
            text: "help",
            accessibilityText: "help",
            icon: "/stores.svg",
            componentName: DefaultQuickLink,
        }
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(() => null),
                setItem: jest.fn(() => null),
                removeItem: jest.fn(() => null),
            },
            writable: true,
        })
    })

    it("should match the snapshot", () => {
        const {asFragment} = render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <QuickLink {...props} />
                </SCThemeProvider>
            </Provider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
