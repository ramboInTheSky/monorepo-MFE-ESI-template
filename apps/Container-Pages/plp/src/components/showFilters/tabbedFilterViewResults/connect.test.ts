import connect from "./connect"
import {renderConnect, createMockStateForTabbedFilters} from "../../../../__mocks__/connect"
import { mockText } from "../../../../__mocks__/mockStore"

const mockState = createMockStateForTabbedFilters({
    totalResults: 5,
    text: mockText
})

describe("Given a showFilters connect", () => {
    let props

    beforeAll(() => {
        props = renderConnect(connect, mockState)
    })

    it("should map state to props correctly", () => {
        expect(props).toEqual(
            expect.objectContaining({
                totalResults: 5,
            }),
        )
    })
})
