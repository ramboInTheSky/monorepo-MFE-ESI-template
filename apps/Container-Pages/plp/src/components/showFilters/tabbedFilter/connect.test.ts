import connect, {mergeProps} from "./connect"
import {renderConnect} from "../../../../__mocks__/connect"
import {createMockStateForSearch} from "../../../ducks/search/__mocks__"
import {searchForSelectedFacets, searchForKeyFilters} from "../../../ducks/tabbedFilters"

jest.mock("../../../ducks/tabbedFilters", () => ({
    searchForSelectedFacets: jest.fn(),
    searchForKeyFilters: jest.fn(),
}))

const mockState = createMockStateForSearch({
    filters: {
        "feat:newin": {
            n: "Brand",
            c: 20,
            v: "feat:newin",
            incompatibleWith: [],
            d: false,
        },
    },
})

mockState.tabbedFilters.facets = {
    "feat:newin": {
        n: "Brand",
        c: 20,
        v: "feat:newin",
        incompatibleWith: [],
        d: false,
    },
}

describe("Given a TabbedFilter connect", () => {
    let props

    beforeAll(() => {
        props = renderConnect(connect, mockState, {filterName: "feat:newin"})
    })

    it("should map state to props correctly", () => {
        expect(props).toEqual(
            expect.objectContaining({
                filterName: "feat:newin",
                filterState: {
                    n: "Brand",
                    c: 20,
                    v: "feat:newin",
                    incompatibleWith: [],
                    d: false,
                },
                onFilterSelect: expect.any(Function),
            }),
        )
    })

    describe("When is tabbed filter", () => {
        it("should map state to props correctly", () => {
            props = renderConnect(connect, mockState, {filterName: "feat:newin", isTabbedFilter: true})

            expect(props).toEqual(
                expect.objectContaining({
                    filterName: "feat:newin",
                    filterState: {
                        n: "Brand",
                        c: 20,
                        v: "feat:newin",
                        incompatibleWith: [],
                        d: false,
                    },
                    onFilterSelect: expect.any(Function),
                }),
            )
        })
    })

    it("should create onFilterSelect ", () => {
        const mockDispatch = jest.fn()
        const testMergeProps = mergeProps(
            mockState,
            {dispatch: mockDispatch},
            {filterName: "feat:newin", facetName: "feat"},
        )
        testMergeProps.onFilterSelect()
        expect(searchForKeyFilters).toHaveBeenCalledWith("feat:newin")
    })

    describe('When is tabbed filter and "onFilterSelect" is triggered', () => {
        it("should ", () => {
            const mockDispatch = jest.fn()
            const testMergeProps = mergeProps(
                mockState,
                {dispatch: mockDispatch},
                {filterName: "feat:newin", facetName: "feat", isTabbedFilter: true},
            )
            testMergeProps.onFilterSelect()
            expect(searchForSelectedFacets).toHaveBeenCalledWith({child: "feat:newin", parent: "feat"})
        })
    })
})
