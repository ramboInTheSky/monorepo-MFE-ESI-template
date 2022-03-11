import api from "."

describe("Config - endpoints - productsSummary - getApi: ", () => {
    const searchApi = api("getProductSummary")
    it("should return the correct internal endpoint", () => {
        expect(searchApi.localEndpoint("1234")).toEqual("/products/1234")
    })
    it("should return the correct method", () => {
        expect(searchApi.method).toEqual("get")
    })
    it("should return the correct routeDefinition", () => {
        expect(searchApi.routeDefinition).toEqual("/products/:itemNumber")
    })
    const mockSettings = {
        realm: "superman",
        theme: "foo",
        alignment: "bar",
        territory: "GB",
        language: "en",
    }
    it("should return the correct external URL", () => {
        const mockedSettings = {...mockSettings, realm: "Amido", territory: "GB", language: "en"}
        expect(searchApi.url(mockedSettings)("1234")).toEqual("ironman/Amido/GB/en/v1/products/1234")
    })
})
