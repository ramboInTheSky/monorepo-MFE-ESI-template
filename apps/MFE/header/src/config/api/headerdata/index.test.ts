import api from "."

describe("Config - endpoints - header - getHeaderData: ", () => {
    const headerApi = api("getHeaderData")
    it("should return the correct internal endpoint", () => {
        expect(headerApi.localEndpoint()).toEqual("/headerdata")
    })
    it("should return the correct method", () => {
        expect(headerApi.method).toEqual("get")
    })
    it("should return the correct routeDefinition", () => {
        expect(headerApi.routeDefinition).toEqual("/headerdata")
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
        expect(headerApi.url(mockedSettings)()).toEqual("<REACT_APP_API_BASEURL>/amido/GB/en/v1/headers/Default")
    })
})
