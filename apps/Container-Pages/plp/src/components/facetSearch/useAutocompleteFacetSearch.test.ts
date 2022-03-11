/* eslint-disable import/no-extraneous-dependencies */
import {renderHook, act} from "@testing-library/react-hooks"
import {FacetsState} from "../../models/FacetsState"
import {useAutocompleteFacetSearch} from "./useAutocompleteFacetSearch"
import TrackViewAllModalSearchBar from "../../events/trackEvent/events/viewAllModalSearchBar"

jest.mock("../../events/trackEvent/events/viewAllModalSearchBar")

describe("Given useAutocompleteFacetSearch", () => {
    const mockFilters: FacetsState = {
        "brand:amido": {n: "Amido", c: 1, v: "brand:amido", incompatibleWith: [], d: false},
        "brand:nike": {n: "Nike", c: 1, v: "brand:nike", s: true, incompatibleWith: [], d: false},
        "brand:adidas": {n: "Adidas", c: 1, v: "brand:adidas", incompatibleWith: [], d: false},
    }
    const mockHandleSetFilterModal = jest.fn()

    beforeEach(() => {
        mockHandleSetFilterModal.mockClear()
    })

    it("should return the correct defaults", () => {
        const {result} = renderHook(() => useAutocompleteFacetSearch(mockFilters, mockHandleSetFilterModal))
        expect(result.current.filterValue).toEqual(null)
        expect(result.current.inputString).toEqual("")
    })

    it("should update searchString", () => {
        const {result} = renderHook(() => useAutocompleteFacetSearch(mockFilters, mockHandleSetFilterModal))
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        act(() => {
            result.current.setSearchString(jest.fn(), "testsearch")
        })
        expect(result.current.inputString).toEqual("testsearch")
    })

    it("should not trigger handleSetFilterModal when a filter that's already selected is chosen", () => {
        const {result} = renderHook(() => useAutocompleteFacetSearch(mockFilters, mockHandleSetFilterModal))
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        act(() => {
            result.current.setSearchString(jest.fn(), "Nike")
            result.current.setFilterValue(jest.fn(), {v: "brand:nike"})
        })
        expect(result.current.inputString).toEqual("")
        expect(result.current.filterValue).toEqual(null)
        expect(mockHandleSetFilterModal).not.toHaveBeenCalled()
    })

    it("should not trigger handleSetFilterModal when an invalid filter is passed", () => {
        const {result} = renderHook(() => useAutocompleteFacetSearch(mockFilters, mockHandleSetFilterModal))
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        act(() => {
            result.current.setSearchString(jest.fn(), "Invalid")
            result.current.setFilterValue(jest.fn(), {v: "brand:invalid"})
        })
        expect(result.current.inputString).toEqual("")
        expect(result.current.filterValue).toEqual(null)
        expect(mockHandleSetFilterModal).not.toHaveBeenCalled()
    })

    it("should trigger handleSetFilterModal when an unselected filter is selected", () => {
        const {result} = renderHook(() => useAutocompleteFacetSearch(mockFilters, mockHandleSetFilterModal))
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        act(() => {
            result.current.setSearchString(jest.fn(), "Adidas")
            result.current.setFilterValue(jest.fn(), {v: "brand:adidas"})
        })
        expect(result.current.inputString).toEqual("")
        expect(result.current.filterValue).toEqual(null)
        expect(mockHandleSetFilterModal).toHaveBeenCalledWith("brand:adidas")
        expect(TrackViewAllModalSearchBar).toHaveBeenCalledWith("brand:adidas")
    })
})
