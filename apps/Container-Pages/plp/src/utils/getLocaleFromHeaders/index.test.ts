import getLocaleFromHeaders from "."

describe("Given a getLocaleFromHeaders", () => {
    describe("When getting locale from headers", () => {
        const mockHeaders = {
            "x-monorepo-language": "en",
            "x-monorepo-territory": "gb",
        }
        it("should return the expected Locale", () => {
            expect(getLocaleFromHeaders(mockHeaders)).toEqual("en-GB")
        })
    })
})
