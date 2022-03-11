import api from "."

describe("Config - endpoints - footer - getApi: ", () => {
    const footerApi = api("getFooterData")
    it("should return the correct internal endpoint", () => {
        expect(footerApi.localEndpoint()).toEqual("/footerdata")
    })
    it("should return the correct method", () => {
        expect(footerApi.method).toEqual("get")
    })
    it("should return the correct routeDefinition", () => {
        expect(footerApi.routeDefinition).toEqual("/footerdata")
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
        expect(footerApi.url(mockedSettings)()).toEqual("superman/footer/amido/GB/en/v1/footers/Default")
    })
})
