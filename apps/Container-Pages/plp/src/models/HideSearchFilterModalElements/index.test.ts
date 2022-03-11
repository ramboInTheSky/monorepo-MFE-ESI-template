import {HideSearchFilterModalElements} from "."

describe("Model - HideSearchFilterModalElements: ", () => {
    const mockTestState: HideSearchFilterModalElements = {
        letterNav: false,
        searchBox: true,
    }
    it("should match the HideSearchFilterModalElements", () => {
        expect(mockTestState).toMatchSnapshot()
    })
})
