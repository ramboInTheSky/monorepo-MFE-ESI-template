import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {QuickLinksContainer, QuickLinksContainerProps} from "."
import {mockTheme} from "../../../__mocks__/mockStore"

jest.mock("../QuickLinks", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>QuickLinks component</div>,
}))

jest.mock("../MyAccount", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>MyAccount component</div>,
}))

describe("Components - QuickLinksContainer: ", () => {
    const props: QuickLinksContainerProps = {quickLinks: []}
    it("should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <QuickLinksContainer {...props} />
            </SCThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
