import {FilterCookie} from "."

describe("Model - cookie: ", () => {
    const mockCookie: FilterCookie = {
        page: "test",
        filterCategorySettings: {
            test: {
                isOpen: true,
                viewMoreOpened: false,
            },
        },
    }
    it("should match the FilterCookie", () => {
        expect(mockCookie).toMatchSnapshot()
    })
})
