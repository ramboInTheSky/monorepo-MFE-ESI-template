import deburr from "."

describe("Given deburr:", () => {
    it("should convert lower case accented characters to their non accented equivalent", () => {
        expect(deburr("écoute")).toEqual("ecoute")
    })

    it("should convert upper case accented characters to their non accented equivalent", () => {
        expect(deburr("Écoute")).toEqual("Ecoute")
    })

    it("should convert a complex accented word to its non accented equivalent", () => {
        expect(deburr("ëężžåãôöōî")).toEqual("eezzaaoooi")
    })
})
