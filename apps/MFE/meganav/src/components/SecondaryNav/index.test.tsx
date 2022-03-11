import React from "react"
import {Provider} from "react-redux"
import {ThemeProvider, useTheme} from "@mui/styles"
import {createTheme, Breakpoint, Theme} from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"

type BreakpointOrNull = Breakpoint | null
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {SecondaryNav, SecondaryNavProps} from "."
import mockStore, {mockTheme} from "../../../__mocks__/mockStore"

function useWidth(size: Breakpoint) {
    const theme: Theme = useTheme()
    const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse()
    return (
        keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const matches = useMediaQuery(theme.breakpoints.up(key))
            return !output && matches ? key : output
        }, null) || size
    )
}

const renderInSize = (size, props: any) => {
    useWidth(size)
    const theme = createTheme()
    return render(
        <Provider store={mockStore}>
            <SCThemeProvider theme={mockTheme}>
                <ThemeProvider theme={theme}>
                    <SecondaryNav {...props} />
                </ThemeProvider>
                );
            </SCThemeProvider>
        </Provider>,
    )
}

jest.mock("../../config/constants", () => ({
    DRAWER_RESET_HEIGHT_SCROLL_TRIGGER: 0,
}))

jest.mock("../SecondaryNavContent", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>Catalogue and missions</div>,
}))
describe("Components - Secondary Nav: ", () => {
    let props: SecondaryNavProps

    describe("when rendered in a drawer", () => {
        beforeEach(() => {
            props = {
                anchor: "left",
                open: false,
                deactivateIndex: jest.fn(),
                isInPrimaryNav: false,
                isInSecondaryNav: false,
            }
        })
        it("should match the snapshot when closed", () => {
            const {asFragment} = renderInSize("xs", props)
            expect(asFragment()).toMatchSnapshot()
        })
        it("should match the snapshot when open", () => {
            const {asFragment} = renderInSize("xs", {...props, open: true})
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("when rendered in an overlay", () => {
        beforeEach(() => {
            props = {
                anchor: "left",
                open: false,
                deactivateIndex: jest.fn(),
                isInPrimaryNav: false,
                isInSecondaryNav: false,
            }
        })
        it("should match the snapshot when closed", () => {
            const {asFragment} = renderInSize("lg", props)
            expect(asFragment()).toMatchSnapshot()
        })
        it("should match the snapshot when open", () => {
            const {asFragment} = renderInSize("lg", {...props, isInPrimaryNav: true})
            expect(asFragment()).toMatchSnapshot()
        })
        it("should match the snapshot when hovering on the secondary meganav", () => {
            const {asFragment} = renderInSize("lg", {...props, isInSecondaryNav: true})
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
