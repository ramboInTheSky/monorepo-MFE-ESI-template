import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {PrimaryNav} from "."
import {mockTheme} from "../../../__mocks__/mockStore"

jest.mock("../SnailTrail", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>SnailTrail</div>,
}))

describe("Components - PrimaryNav: ", () => {
    it("should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <PrimaryNav closeNav={jest.fn()} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
