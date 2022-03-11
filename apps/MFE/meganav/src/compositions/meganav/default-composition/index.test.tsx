import React from "react"
import {render} from "@testing-library/react"
import {Provider} from "react-redux"
import {SCThemeProvider} from "@monorepo/theme-provider"
import mockStore, {mockTheme} from "../../../../__mocks__/mockStore"
import {DefaultMegaNav} from "."

jest.mock("../../../components/PrimaryNav", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>I AM PRIMARY NAV COMPONENT</div>,
}))
jest.mock("../../../components/SecondaryNav", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>I AM Secondary NAV COMPONENT</div>,
}))

describe("Pages: MegaNav - ", () => {
    describe("When the meganav renders with regions ", () => {
        it("should show the default meganav", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Provider store={mockStore}>
                        <DefaultMegaNav />
                    </Provider>
                    ,
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
