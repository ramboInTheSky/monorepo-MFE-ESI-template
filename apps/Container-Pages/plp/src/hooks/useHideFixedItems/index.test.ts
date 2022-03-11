import * as Redux from "react-redux"
import {renderHook} from "@testing-library/react-hooks"

import _TrackFilterSelection from "../../events/trackEvent/events/trackFilterSelection"
import _TrackFilterDeselect from "../../events/trackEvent/events/trackFilterDeselect"
import _TrackIsViewMoreTriggeredFilter from "../../events/trackEvent/events/trackIsViewMoreTriggeredFilter"
import _TrackIsViewLessTriggeredFilter from "../../events/trackEvent/events/trackIsViewLessTriggeredFilter"

import {useHideFixedItems} from "."
import * as SearchDuck from "../../ducks/search"
import * as HasReachedFooterHook from "./useHasReachedFooter"

const defaultMockValues = {
    hasReachedFooter: false,
    calculateHasReachedFooter: jest.fn(() => true),
    isFetchingNextPage: false,
}

function setMocks(values: Partial<typeof defaultMockValues> = {}) {
    const {hasReachedFooter, calculateHasReachedFooter, isFetchingNextPage} = {...defaultMockValues, ...values}
    jest.spyOn(HasReachedFooterHook, "useHasReachedFooter").mockReturnValue({
        hasReachedFooter,
        calculateHasReachedFooter,
    })
    jest.spyOn(SearchDuck, "selectIsFetchingNextPage").mockReturnValue(isFetchingNextPage)
    jest.spyOn(Redux, "useSelector").mockImplementation((selector: Function) => selector())
}

jest.mock("../../events/trackEvent/events/trackFilterSelection", () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock("../../events/trackEvent/events/trackFilterDeselect", () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock("../../events/trackEvent/events/trackIsViewMoreTriggeredFilter", () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock("../../events/trackEvent/events/trackIsViewLessTriggeredFilter", () => ({
    __esModule: true,
    default: jest.fn(),
}))

describe("Given a useHideFixedItems() hook", () => {
    it("should have defaults", () => {
        setMocks()

        const {result} = renderHook(() => useHideFixedItems())
        expect(result.current).toEqual({
            hideFixedItems: false,
        })
    })

    describe("When is fetching next page and has not reached footer", () => {
        it("should not hide fixed items", () => {
            setMocks({isFetchingNextPage: true, hasReachedFooter: false})
            const {result} = renderHook(() => useHideFixedItems())
            expect(result.current).toEqual({
                hideFixedItems: false,
            })
        })
    })

    describe("When is not fetching next page and has not reached footer", () => {
        it("should not hide fixed items", () => {
            setMocks({isFetchingNextPage: false, hasReachedFooter: false})
            const {result} = renderHook(() => useHideFixedItems())
            expect(result.current).toEqual({
                hideFixedItems: false,
            })
        })
    })

    describe("When is not fetching next page and has reached footer", () => {
        it("should hide fixed items", () => {
            setMocks({isFetchingNextPage: false, hasReachedFooter: true})
            const {result} = renderHook(() => useHideFixedItems())
            expect(result.current).toEqual({
                hideFixedItems: true,
            })
        })
    })
})
