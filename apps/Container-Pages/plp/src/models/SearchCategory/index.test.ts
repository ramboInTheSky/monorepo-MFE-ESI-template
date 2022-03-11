import {SearchCategories} from "."

describe("Model: SearchCategory", () => {
    const mockSearchCategory = new SearchCategories()
    it("should match the snapshot", () => {
        expect(mockSearchCategory).toMatchSnapshot()
    })
})
