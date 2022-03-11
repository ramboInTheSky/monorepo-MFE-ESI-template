import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Given connect - mapStateToProps()", () => {
    describe("and filters are present", () => {
        const mockDataWithFilters = {...mockState}
        it("should return false when items are present", () => {
            expect(mapStateToProps(mockDataWithFilters)).toEqual({
                noResults: false
            })
        })

        it("should return false when items are not present", () => {
            mockDataWithFilters.search.items = []
            expect(mapStateToProps(mockDataWithFilters)).toEqual({
                noResults: false
            })
        })
    })

    describe("and filters are empty", () => {
        const mockDataWithoutFilters = {
            ...mockState,
            search: {
                ...mockState.search,
                facets: {}
            }
        }
        it("should return false when items are present", () => {
            expect(mapStateToProps(mockDataWithoutFilters)).toEqual({
                noResults: false
            })
        })

        it("should return true when items are not present", () => {
            mockDataWithoutFilters.search.items = []
            expect(mapStateToProps(mockDataWithoutFilters)).toEqual({
                noResults: true
            })
        })
    })
})
