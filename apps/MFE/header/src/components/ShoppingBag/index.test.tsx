import React from "react"
import {render, screen, fireEvent} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {
    useShoppingBagGetCallbackObservable,
    useShoppingBagAddCallbackObservable,
    useShoppingBagAddCistCallbackObservable,
    useShoppingBagAddEVoucherCallbackObservable,
    useShoppingBagAddLinkedItemCallbackObservable,
    useShoppingBagAddMultipleCallbackObservable,
    useShoppingBagAddWarrantyCallbackObservable,
    useShoppingBagRemoveCallbackObservable,
    useShoppingBagUpdateSizeCallbackObservable,
    useShoppingBagUpdateQuantityCallbackObservable,
    useModalsCloseObservable,
} from "@monorepo/eventservice"
import {PublishToModalsClosed} from "../../events/modalsClosed"
import {ShoppingBag} from "."
import {mockTheme} from "../../../__mocks__/mockStore"
import {LOCAL_STORAGE_ACTIVE_DEPT_NAME} from "../../config/constants"

jest.mock("@monorepo/eventservice")

const mockUpdateShoppingBag = jest.fn()
const mockAddEVoucherToBag = jest.fn()

jest.mock("../../events/modalsClosed")

const props = {
    altText: "photo",
    iconUrl: "/abc123",
    itemCount: 0,
    bag: {ShoppingBag: {Items: []}},
    updateShoppingBag: mockUpdateShoppingBag,
    addEVoucherToBag: mockAddEVoucherToBag,
    isBagLoading: false,
    shoppingBagUrl: "fakeamido.com/shoppingbag",
    miniBagTooltipPlacement: "bottom-end",
}

jest.mock("../MiniShoppingBag")
jest.mock("../ShoppingBagNotification")

const mockSetState = jest.fn()
jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useState: initial => [initial, mockSetState],
}))

describe("Components - ShoppingBag: ", () => {
    beforeEach(() => {
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(() => null),
                setItem: jest.fn(() => null),
                removeItem: jest.fn(() => null),
            },
            writable: true,
        })
        mockSetState.mockReset()
    })
    it("should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <ShoppingBag {...props} />
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
                <ShoppingBag {...props} />
            </SCThemeProvider>,
        )
        expect(useModalsCloseObservable).toHaveBeenCalled()
        expect(mockSetState).toHaveBeenCalledWith(false)
    })

    it("should call publishToModalsClosed", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <ShoppingBag {...props} />
            </SCThemeProvider>,
        )
        const link = screen.getByTestId("shopping-bag-link-button")
        fireEvent.click(link)
        expect(PublishToModalsClosed).toHaveBeenCalled()
    })

    it("should match the snapshot when isBagLoading is true", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <ShoppingBag {...{...props, isBagLoading: true}} />
            </SCThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    it("should subscribe to the ESB events", () => {
        ;(useShoppingBagGetCallbackObservable as any).mockImplementationOnce(cb => {
            cb("useShoppingBagGetCallbackObservable")
        })
        ;(useShoppingBagAddCallbackObservable as any).mockImplementationOnce(cb => {
            cb("useShoppingBagAddCallbackObservable")
        })
        ;(useShoppingBagAddCistCallbackObservable as any).mockImplementationOnce(cb => {
            cb("useShoppingBagAddCistCallbackObservable")
        })
        ;(useShoppingBagAddEVoucherCallbackObservable as any).mockImplementationOnce(cb => {
            cb("useShoppingBagAddEVoucherCallbackObservable")
        })
        ;(useShoppingBagAddLinkedItemCallbackObservable as any).mockImplementationOnce(cb => {
            cb("useShoppingBagAddLinkedItemCallbackObservable")
        })
        ;(useShoppingBagAddMultipleCallbackObservable as any).mockImplementationOnce(cb => {
            cb("useShoppingBagAddMultipleCallbackObservable")
        })
        ;(useShoppingBagAddWarrantyCallbackObservable as any).mockImplementationOnce(cb => {
            cb("useShoppingBagAddWarrantyCallbackObservable")
        })
        ;(useShoppingBagRemoveCallbackObservable as any).mockImplementationOnce(cb => {
            cb("useShoppingBagRemoveCallbackObservable")
        })
        ;(useShoppingBagUpdateSizeCallbackObservable as any).mockImplementationOnce(cb => {
            cb("useShoppingBagUpdateSizeCallbackObservable")
        })
        ;(useShoppingBagUpdateQuantityCallbackObservable as any).mockImplementationOnce(cb => {
            cb("useShoppingBagUpdateQuantityCallbackObservable")
        })
        ;(useModalsCloseObservable as any).mockImplementationOnce(cb => {
            cb("useModalsCloseObservable")
        })
        render(
            <SCThemeProvider theme={mockTheme}>
                <ShoppingBag {...props} />
            </SCThemeProvider>,
        )

        expect(useShoppingBagGetCallbackObservable).toHaveBeenCalled()
        expect(mockUpdateShoppingBag).toHaveBeenCalledWith("useShoppingBagGetCallbackObservable")
        expect(mockUpdateShoppingBag).toHaveBeenCalledWith("useShoppingBagAddCallbackObservable")
        expect(mockUpdateShoppingBag).toHaveBeenCalledWith("useShoppingBagAddCistCallbackObservable")
        expect(mockAddEVoucherToBag).toHaveBeenCalledWith("useShoppingBagAddEVoucherCallbackObservable")
        expect(mockUpdateShoppingBag).toHaveBeenCalledWith("useShoppingBagAddLinkedItemCallbackObservable")
        expect(mockUpdateShoppingBag).toHaveBeenCalledWith("useShoppingBagAddMultipleCallbackObservable")
        expect(mockUpdateShoppingBag).toHaveBeenCalledWith("useShoppingBagAddWarrantyCallbackObservable")
        expect(mockUpdateShoppingBag).toHaveBeenCalledWith("useShoppingBagRemoveCallbackObservable")
        expect(mockUpdateShoppingBag).toHaveBeenCalledWith("useShoppingBagUpdateSizeCallbackObservable")
        expect(mockUpdateShoppingBag).toHaveBeenCalledWith("useShoppingBagUpdateQuantityCallbackObservable")
        expect(useModalsCloseObservable).toHaveBeenCalled()
    })
    it("should remove localStorage when clicked", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <ShoppingBag {...props} />
            </SCThemeProvider>,
        )

        fireEvent.click(screen.getByTestId("header-shopping-bag-link-el"))
        /* eslint-disable */
        expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1)
        expect(window.localStorage.removeItem).toHaveBeenCalledWith(LOCAL_STORAGE_ACTIVE_DEPT_NAME)
        /* eslint-enable */
    })
})
