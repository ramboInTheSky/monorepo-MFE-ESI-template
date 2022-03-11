import connect, {mapDispatchToProps} from "./connect"
import {renderConnect} from "../../../../__mocks__/connect"
import {setBrandName} from "../../../ducks/tabbedFilters"

const mockSetBrandAction = jest.fn()

jest.mock("../../../ducks/tabbedFilters", () => ({
    setBrandName: jest.fn(() => mockSetBrandAction),
}))

const mockState = {}

describe("Given a tabbedFiltersPanel connect", () => {
    it("should return the right props", () => {
        const props = renderConnect(connect, mockState) as any
        expect(props).toEqual(
            expect.objectContaining({
                setBrandNameForSearch: expect.any(Function),
            }),
        )
    })
})

describe("Given a mapDispatchToProps", () => {
    it("should call dispatch with expected action", () => {
        const expectedEvent = {} as any
        mapDispatchToProps.setBrandNameForSearch(expectedEvent)
        expect(setBrandName).toHaveBeenCalledWith(expectedEvent)
    })
})
