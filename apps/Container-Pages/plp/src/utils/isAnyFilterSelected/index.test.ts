import {getIsAnyFilterSelected} from "."
import {mockState} from "../../../__mocks__/mockStore"

describe("Given a getIsAnyFilterSelected() function", () => {
    it("if no facet is sent the appropriate result is returned", () => {
        const mockHistoricFilter = {Test1: ["opt1"]}

        expect(getIsAnyFilterSelected(mockHistoricFilter)).toEqual(true)
    })

    it("if a facet is sent the appropriate result is returned", () => {
        expect(getIsAnyFilterSelected({Test1: ["opt1"]}, mockState.tabbedFilters.filters.Test4)).toEqual(true)
    })
})
