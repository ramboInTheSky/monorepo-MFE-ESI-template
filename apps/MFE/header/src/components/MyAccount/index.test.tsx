import React from "react"
import {render, screen, fireEvent} from "@testing-library/react"
import {useShoppingBagGetCallbackObservable, useModalsCloseObservable} from "@monorepo/eventservice"
import {createTheme, Breakpoint, Direction, Theme} from "@mui/material"
import {ThemeProvider, useTheme} from "@mui/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {PublishToModalsClosed} from "../../events/modalsClosed"
import {MyAccount, MyAccountProps} from "."
import {mockTheme, mockText} from "../../../__mocks__/mockStore"
import {NO_FOLLOW, LOCAL_STORAGE_ACTIVE_DEPT_NAME} from "../../config/constants"

type BreakpointOrNull = Breakpoint | null

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

jest.mock("@monorepo/eventservice")
;(useShoppingBagGetCallbackObservable as any).mockImplementationOnce(cb => {
    cb("useShoppingBagGetCallbackObservable")
})

const mockUpdateShoppingBag = jest.fn()

jest.mock("../../events/modalsClosed")

jest.mock("../../config/constants", () => {
    return {
        __esModule: true,
        // eslint-disable-next-line @typescript-eslint/require-await
        NO_FOLLOW: "nofollow",
    }
})

describe("Components - MyAccount: ", () => {
    let props: MyAccountProps
    beforeEach(() => {
        props = {
            hideText: false,
            accessibilityText: "sample",
            isLoggedIn: false,
            url: "https://amido.com",
            signoutUrl: "https://amido.com/signout",
            narrowModeIcon: "https://amido.com/icon",
            tooltipIcon: "https://amido.com/tooltip",
            wideModeIcon: "https://amido.com/icon",
            myAccountText: "Mike",
            userUpdated: true,
            updateShoppingBag: mockUpdateShoppingBag,
            text: mockText.myAccount,
            firstName: "Mike",
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
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <MyAccount {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot when userUpdated is false ", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <MyAccount {...props} userUpdated={false} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should call useModalsCloseObservable", () => {
        ;(useModalsCloseObservable as any).mockImplementationOnce(cb => {
            cb("useModalsCloseObservable")
        })

        render(
            <SCThemeProvider theme={mockTheme}>
                <MyAccount {...props} />
            </SCThemeProvider>,
        )
        expect(useModalsCloseObservable).toHaveBeenCalled()
    })

    it("should call the getShoppingBag subscribe", () => {
        expect(useShoppingBagGetCallbackObservable).toHaveBeenCalled()
        expect(mockUpdateShoppingBag).toHaveBeenCalledWith("useShoppingBagGetCallbackObservable")
    })

    describe("When not logged in", () => {
        it("should have required url", () => {
            const userName = "my account"
            render(
                <SCThemeProvider theme={mockTheme}>
                    <MyAccount {...props} myAccountText={userName} />
                </SCThemeProvider>,
            )
            const link = screen.getByText(userName).closest("a") as HTMLAnchorElement
            expect(link).toHaveAttribute("href", props.url)
        })
        it("should have required text", () => {
            const userName = "my account"
            render(
                <SCThemeProvider theme={mockTheme}>
                    <MyAccount {...props} myAccountText={userName} />
                </SCThemeProvider>,
            )
            const got = screen.getByText(userName).closest("a")
            expect(got).toHaveTextContent(userName)
        })
        describe("without myAccountText", () => {
            it("should not have user name", () => {
                render(
                    <SCThemeProvider theme={mockTheme}>
                        <MyAccount {...props} myAccountText="" />
                    </SCThemeProvider>,
                )
                const got = screen.queryByText(props.myAccountText)
                expect(got).toBeNull()
            })

            it("should have link", () => {
                render(
                    <SCThemeProvider theme={mockTheme}>
                        <MyAccount {...props} myAccountText="" />
                    </SCThemeProvider>,
                )
                const got = screen.getByTestId("header-adaptive-my-account-icon-container-link")
                expect(got).toHaveAttribute("href", props.url)
            })
        })
    })

    describe("When logged in", () => {
        it("should container required text", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <MyAccount {...props} isLoggedIn />
                </SCThemeProvider>,
            )
            const link = screen.getByText(props.myAccountText)
            fireEvent.click(link)
            const toolTip = screen.getByRole("tooltip")
            expect(toolTip).toHaveTextContent(`Not ${props.myAccountText}?`)
        })

        it("should call publishToModalsClosed", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <MyAccount {...props} isLoggedIn />
                </SCThemeProvider>,
            )
            const link = screen.getByText(props.myAccountText)
            fireEvent.click(link)
            expect(PublishToModalsClosed).toHaveBeenCalled()
        })

        it("should redirect view Summary when clicked", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <MyAccount {...props} isLoggedIn />
                </SCThemeProvider>,
            )
            const link = screen.getByText(props.myAccountText)
            fireEvent.click(link)
            const got = screen.getByText(props.text.title)
            expect(got).toHaveAttribute("href", props.url)
        })
        it("should have rel attribute", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <MyAccount {...props} isLoggedIn />
                </SCThemeProvider>,
            )
            const got = screen.getAllByRole("link")
            expect(got[0]).toHaveAttribute("rel", NO_FOLLOW)
        })
        it("should be able to signout when clicked", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <MyAccount {...props} isLoggedIn />
                </SCThemeProvider>,
            )
            const link = screen.getByText(props.myAccountText)
            fireEvent.click(link)
            const got = screen.getByText(props.text.buttonText).closest("a")
            expect(got).toHaveAttribute("href", props.signoutUrl)
        })
        it("should remove localStorage when clicked my account icon", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <MyAccount {...props} isLoggedIn />
                </SCThemeProvider>,
            )

            fireEvent.click(screen.getByTestId("header-adaptive-my-account-smallIcon"))
            /* eslint-disable */
            expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1)
            expect(window.localStorage.removeItem).toHaveBeenCalledWith(LOCAL_STORAGE_ACTIVE_DEPT_NAME)
            /* eslint-enable */
        })
        it("should remove localStorage when clicked my account link while not logged in", () => {
            useWidth("lg")
            const newTheme = createTheme()
            const mergedTheme = {...newTheme, ...mockTheme}

            render(
                <SCThemeProvider theme={mergedTheme}>
                    <MyAccount {...props} isLoggedIn={false} />
                </SCThemeProvider>,
            )

            fireEvent.click(screen.getByTestId("header-adaptive-my-account-icon-container"))
            /* eslint-disable */
            expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1)
            expect(window.localStorage.removeItem).toHaveBeenCalledWith(LOCAL_STORAGE_ACTIVE_DEPT_NAME)
            /* eslint-enable */
        })
        it("should remove localStorage when clicked my account link on the Tooltip while logged in", () => {
            useWidth("lg")
            const newTheme = createTheme()
            const mergedTheme = {...newTheme, ...mockTheme}

            render(
                <SCThemeProvider theme={mergedTheme}>
                    <MyAccount {...props} isLoggedIn />
                </SCThemeProvider>,
            )

            fireEvent.click(screen.getByTestId("header-adaptive-my-account-icon-container"))
            fireEvent.click(screen.getByTestId("header-my-account-container-tooltip-link"))
            /* eslint-disable */
            expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1)
            expect(window.localStorage.removeItem).toHaveBeenCalledWith(LOCAL_STORAGE_ACTIVE_DEPT_NAME)
            /* eslint-enable */
        })

        describe("without myAccountText", () => {
            it("should not have user name", () => {
                render(
                    <SCThemeProvider theme={mockTheme}>
                        <MyAccount {...props} myAccountText="" isLoggedIn />
                    </SCThemeProvider>,
                )
                const got = screen.queryByText(props.myAccountText)
                expect(got).toBeNull()
            })
        })
    })
})
