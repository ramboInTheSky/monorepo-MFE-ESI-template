import api from "."

describe("Config - endpoints - search - getApi: ", () => {
    const searchApi = api("getPrimaryNavData")
    it("should return the correct internal endpoint", () => {
        expect(searchApi.localEndpoint()).toEqual("/appdata")
    })
    it("should return the correct method", () => {
        expect(searchApi.method).toEqual("get")
    })
    it("should return the correct routeDefinition", () => {
        expect(searchApi.routeDefinition).toEqual("/appdata")
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
        const expectedUrl = "<REACT_APP_API_BASEURL>/Amido/GB/en/v1/primary-items/Home"
        expect(searchApi.url(mockedSettings)()).toEqual(expectedUrl)
    })
})
