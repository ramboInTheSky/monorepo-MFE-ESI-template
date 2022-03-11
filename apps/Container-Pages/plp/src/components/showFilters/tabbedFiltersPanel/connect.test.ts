import connect from "./connect"
import {renderConnect, createMockStateForTabbedFilters} from "../../../../__mocks__/connect"

const mockSetBrandAction = jest.fn()

jest.mock("../../../ducks/tabbedFilters", () => ({
    setBrandName: jest.fn(() => mockSetBrandAction),
}))

const mockState = createMockStateForTabbedFilters({
    selectedFilter: "filterOne",
    filters: {
        filterOne: {
            name: "filterOne",
            displayName: "filterOne",
            type: "filter",
            isFilterOpen: false,
            isViewMoreOpen: false,
            facets: ["filterOne:facetOne", "filterOne:facetTwo", "filterOne:facetThree"],
        },
    },
    brandSearch: "two",
})

describe("Given a tabbedFiltersPanel connect", () => {
    it("should return the right props", () => {
        const props = renderConnect(connect, mockState)
        expect(props).toEqual(
            expect.objectContaining({
                filter: {
                    name: "filterOne",
                    displayName: "filterOne",
                    type: "filter",
                    isFilterOpen: false,
                    isViewMoreOpen: false,
                    facets: ["filterOne:facetOne", "filterOne:facetTwo", "filterOne:facetThree"],
                },
                isFetchingPageItems: false,
            }),
        )
    })
})
