import filterFits from "."

describe("Given a Filter Fits function", () => {
    it('When "Regular", "Petite", "Tall", it should filter and sort fits', () => {
        expect(filterFits(["Regular", "Petite", "Tall"])).toEqual(["Petite", "Tall"])
    })

    it('When "Tall", "Petite", it should filter and sort fits', () => {
        expect(filterFits(["Tall", "Petite"])).toEqual(["Petite", "Tall"])
    })

    it('When "Regular/Tall", "Petite", it should filter and sort fits', () => {
        expect(filterFits(["Regular/Tall", "Petite"])).toEqual(["Petite", "Tall"])
    })
    
    it('When "Reg/Long/XL Tall", "Petite", it should filter and sort fits', () => {
        expect(filterFits(["Reg/Long/XL Tall", "Petite"])).toEqual(["Petite", "Tall"])
    })

    it('When "Reg/Long/XL Tall", "Petite", it should handle non string values', () => {
        expect(filterFits(["Reg/Long/XL Tall", "Petite", null as any])).toEqual(["Petite", "Tall"])
    })

    it("When empty, it should filter and sort fits", () => {
        expect(filterFits([])).toEqual([])
    })

    it("When undefined, it should filter and sort fits", () => {
        expect(filterFits(undefined)).toEqual([])
    })
})
