import {isSearchApiResponse, isRedirectResponse} from "./typeGuards"
import {ExternalSearchApiResponse, SearchApiResponse} from "."

describe("Given a isSearchApiResponse", () => {
    it("should correctly type an object", () => {
        const mockResponse = {
            redirectUrl: "test",
        }
        expect(isSearchApiResponse(mockResponse as any)).toEqual(true)
    })

    it("should correctly type an invalid object", () => {
        expect(isSearchApiResponse(new ExternalSearchApiResponse())).toEqual(false)
    })
})

describe("Given a isRedirectResponse", () => {
    it("should correctly type an object", () => {
        const mockResponse = {
            statusCode: "test",
        }
        expect(isRedirectResponse(mockResponse as any)).toEqual(true)
    })

    it("should correctly type an invalid object", () => {
        expect(isRedirectResponse(new SearchApiResponse())).toEqual(false)
    })
})
