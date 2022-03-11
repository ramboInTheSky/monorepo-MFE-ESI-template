import getWithDynamicYear from "."

describe("getWithDynamicYear function", () => {
    it("Should not edit the text if year placeholder is not present", () => {
        expect(getWithDynamicYear("© 2019 Amido Retail Ltd. All rights reserved.")).toBe(
            "© 2019 Amido Retail Ltd. All rights reserved.",
        )
    })
    it("Should edit the text if year placeholder is present", () => {
        const mockDate = new Date("14 Oct 1995")
        jest.spyOn(global, "Date").mockImplementation(() => (mockDate as unknown) as string)
        global.Date.now = jest.fn().mockReturnValue(mockDate.valueOf()) // mock Date.now
        expect(getWithDynamicYear("© <yyyy> Amido Retail Ltd. All rights reserved.")).toBe(
            "© 1995 Amido Retail Ltd. All rights reserved.",
        )
    })
})
