import api from "."

describe("Config - endpoints - search - getApi: ", () => {
    const searchApi = api("getReviewStars")
    it("should return the correct internal endpoint", () => {
        expect(searchApi.localEndpoint("123")).toEqual("/products/123/star-rating")
    })
    it("should return the correct method", () => {
        expect(searchApi.method).toEqual("get")
    })
    it("should return the correct routeDefinition", () => {
        expect(searchApi.routeDefinition).toEqual("/products/:itemNumber/star-rating")
    })
    const mockSettings = {
        realm: "string",
        theme: "object",
        alignment: "string",
        territory: "string",
        language: "string",
    }
    it("should return the correct external URL", () => {
        const mockedSettings = {...mockSettings, realm: "Amido", territory: "GB", language: "en"}
        expect(searchApi.url(mockedSettings)("123")).toEqual("superman/Amido/GB/en/v1/products/123/star-rating")
    })
})
