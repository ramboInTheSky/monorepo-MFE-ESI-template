import React from "react"
import {Provider} from "react-redux"
import {render, screen, fireEvent} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import mockStore, {mockTheme, mockText} from "../../../__mocks__/mockStore"
import SnailTrailScrollIcon from "."

jest.mock("../Icon", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <img alt="fake" src="fake" />,
}))

describe("SnailTrailScrollIcon", () => {
    let props
    beforeEach(() => {
        props = {
            placement: "right",
            handleClick: jest.fn(),
            text: {chevronIconAltText: mockText.chevronIconAltText},
        }
    })
    it("should match the snapshot", () => {
        const {asFragment} = render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <SnailTrailScrollIcon {...props} />
                </SCThemeProvider>
            </Provider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should fire handle on click ", () => {
        render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <SnailTrailScrollIcon {...props} />
                </SCThemeProvider>
            </Provider>,
        )
        const scrollIcon = screen.getByRole("img")
        fireEvent.click(scrollIcon)
        expect(props.handleClick).toHaveBeenCalledTimes(1)
    })
    it("when running in rtl mode, it should match the snapshot", () => {
        const {asFragment} = render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <SnailTrailScrollIcon isRTL {...props} />
                </SCThemeProvider>
            </Provider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
