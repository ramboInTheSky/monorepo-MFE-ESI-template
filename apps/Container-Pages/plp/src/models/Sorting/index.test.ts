import {Sorting, SortingOption} from "."

describe("Model - Sorting: ", () => {
    const mockSorting = new Sorting()
    mockSorting.options = [new SortingOption()]
    it("should match the Sorting", () => {
        expect(mockSorting).toMatchSnapshot()
    })
})
