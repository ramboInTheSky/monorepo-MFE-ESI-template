import getRealmFromHeaders from "."

describe("Given a getRealmFromHeaders", () => {
    describe("When getting realm from headers", () => {
        const mockHeaders = {
            "x-monorepo-realm": "amido",
        }
        it("should return the expected realm", () => {
            expect(getRealmFromHeaders(mockHeaders)).toEqual("amido")
        })
    })
})
