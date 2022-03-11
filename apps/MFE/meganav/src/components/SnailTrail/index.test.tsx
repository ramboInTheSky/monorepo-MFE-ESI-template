import React from "react"
import {Provider} from "react-redux"
import {render, screen, fireEvent} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {breakpoints} from "@monorepo/themes"
import {useModalsCloseObservable} from "@monorepo/eventservice"
import {PublishToModalsClosed} from "../../events/modalsClosed"
import {SnailTrail, SnailTrailProps} from "."
import mockStore, {mockTheme} from "../../../__mocks__/mockStore"
import {SELECTED_DEPARTMENT_DETAILS, VISITED_PAGES} from "../../config/constants"

jest.mock("@monorepo/eventservice")

jest.mock("../../events/modalsClosed")
jest.mock("../../utils/calculateWindowOffsets", () => ({
    calcScrollOffset: jest.fn(() => 10),
}))

jest.useFakeTimers()
jest.mock("../../config/constants", () => {
    return {PRIMARY_NAV_ITEM_HOVER_DELAY: 0, DRAWER_SPACING: 40}
})

jest.mock("../SnailItem", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: ({title, target, path, handleClick, handleMouseEnter}) => {
        return (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
            <li
                style={{width: "100px"}}
                onClick={e => handleClick(e, {current: null}, {item: {path, title}, index: 1})}
                onMouseEnter={() => handleMouseEnter}
                data-testid={`snail-item-${target}`}
            >
                <a href={target} title={title}>
                    {title}
                </a>
            </li>
        )
    },
}))

describe("Components - SnailTrail: ", () => {
    let props: SnailTrailProps
    beforeEach(() => {
        const items = [
            {
                title: "New In",
                target: "/new-in",
                path: "test1",
                classNames: "",
            },
            {
                title: "Girls",
                target: "/girls",
                path: "test2",
                classNames: "",
            },
        ]
        props = {
            activeDepartmentIndex: 0,
            items,
            setActiveItem: jest.fn(),
            setIsInPrimaryNav: jest.fn(),
            dir: "rtl",
        }
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(() => null),
                setItem: jest.fn(() => null),
                removeItem: jest.fn(() => null),
            },
            writable: true,
        })
        Element.prototype.scrollBy = jest.fn()
        localStorage.setItem = jest.fn()
        localStorage.getItem = jest.fn()
    })
    it("should match the snapshot", () => {
        const {asFragment} = render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <SnailTrail {...props} />
                </SCThemeProvider>
            </Provider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should call SubscribeToModalsClosed", () => {
        ;(useModalsCloseObservable as any).mockImplementationOnce(cb => {
            cb("useModalsCloseObservable")
        })
        render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <SnailTrail {...props} />
                </SCThemeProvider>
            </Provider>,
        )
        expect(useModalsCloseObservable).toHaveBeenCalled()
    })

    it("should call publishToModalsClosed on Mobile view", () => {
        const win: any = window
        win.innerWidth = breakpoints.values.sm - 1
        jest.mock("../../utils/is-touch-device", () => jest.fn().mockReturnValueOnce(false))
        render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <SnailTrail {...props} />
                </SCThemeProvider>
            </Provider>,
        )
        const link = screen.getByTestId(/girls/i)
        fireEvent.click(link)
        expect(PublishToModalsClosed).toHaveBeenCalled()
    })

    it("should call publishToModalsClosed on Desktop", () => {
        const win: any = window
        win.innerWidth = breakpoints.values.lg - 1
        jest.mock("../../utils/is-touch-device", () => jest.fn().mockReturnValueOnce(false))
        render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <SnailTrail {...props} />
                </SCThemeProvider>
            </Provider>,
        )
        const link = screen.getByTestId(/girls/i)
        fireEvent.mouseEnter(link)
        expect(PublishToModalsClosed).toHaveBeenCalled()
    })
    it("should not call setActiveIndex on hover after a certain delay on screens smaller than large", () => {
        const win: any = window
        win.innerWidth = breakpoints.values.lg - 1
        jest.mock("../../utils/is-touch-device", () => jest.fn().mockReturnValueOnce(false))
        render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <SnailTrail {...props} />
                </SCThemeProvider>
            </Provider>,
        )
        const item = screen.getByText(/girls/i)
        fireEvent.mouseEnter(item)
        jest.runAllTimers()
        expect(props.setActiveItem).toHaveBeenCalledTimes(0)
    })

    it("when a user scroll, it should call setActiveIndex on scroll", () => {
        const win: any = window
        win.innerWidth = breakpoints.values.lg - 1
        jest.mock("../../utils/is-touch-device", () => jest.fn().mockReturnValueOnce(false))
        const {getByTestId} = render(
            <div style={{width: "50px"}}>
                <Provider store={mockStore}>
                    <SCThemeProvider theme={mockTheme}>
                        <SnailTrail {...props} />
                    </SCThemeProvider>
                </Provider>
            </div>,
        )

        expect(props.setActiveItem).not.toHaveBeenCalledWith(-1, "")
        fireEvent.scroll(getByTestId("snail-trail-container"))

        expect(props.setActiveItem).toHaveBeenCalledWith(-1, {path: "", title: ""})
    })

    it("when a user clicks a snail item and it scrolls into view, it should not call setActiveIndex", () => {
        const win: any = window
        win.innerWidth = breakpoints.values.lg - 1
        jest.mock("../../utils/is-touch-device", () => jest.fn().mockReturnValueOnce(true))
        const {getByTestId} = render(
            <div style={{width: "50px"}}>
                <Provider store={mockStore}>
                    <SCThemeProvider theme={mockTheme}>
                        <SnailTrail {...props} />
                    </SCThemeProvider>
                </Provider>
            </div>,
        )

        expect(props.setActiveItem).not.toHaveBeenCalledWith(-1, "")
        fireEvent.click(getByTestId("snail-item-/new-in"))
        expect(props.setActiveItem).toHaveBeenCalledWith(1, {path: "test1", title: "New In"})
    })
    it("should call function when clicked", () => {
        Object.defineProperty(window, "innerWidth", {writable: true, configurable: true, value: 1100})

        const {getByTestId} = render(
            <div style={{width: "50px"}}>
                <Provider store={mockStore}>
                    <SCThemeProvider theme={mockTheme}>
                        <SnailTrail {...props} activeDepartmentIndex={1} />
                    </SCThemeProvider>
                </Provider>
            </div>,
        )

        expect(props.setActiveItem).not.toHaveBeenCalledWith(-1, "")
        fireEvent.click(getByTestId("snail-item-/new-in"))
        /* eslint-disable */
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith(
            SELECTED_DEPARTMENT_DETAILS,
            '{"path":"test1","dept":"new in"}',
        )
        expect(localStorage.removeItem).toHaveBeenCalledTimes(1)
        expect(localStorage.removeItem).toHaveBeenCalledWith(VISITED_PAGES)
        /* eslint-enable */
    })

    afterAll(() => {
        jest.clearAllMocks()
    })
})
