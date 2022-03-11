import connect from "./connect"
import {renderConnect, createMockStateForTabbedFilters} from "../../../../__mocks__/connect"

const mockState = createMockStateForTabbedFilters({
    selectedFilter: "filterOne",
})

describe("Given a tabbedFeatFacet connect", () => {
    it("should return the right props", () => {
        const props = renderConnect(connect, mockState)
        expect(props).toEqual(
            expect.objectContaining({
                hasSelectedFacet: true,
            }),
        )
    })
})
