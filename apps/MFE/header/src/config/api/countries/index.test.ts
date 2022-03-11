import api from "."

describe("Config - endpoints - countries - getCountriesListData: ", () => {
    const countriesApi = api("getCountriesListData")
    it("should return the correct internal endpoint", () => {
        expect(countriesApi.localEndpoint()).toEqual("")
    })
    it("should return the correct method", () => {
        expect(countriesApi.method).toEqual("get")
    })
    it("should return the correct routeDefinition", () => {
        expect(countriesApi.routeDefinition).toEqual("/ChannelSelector/GetCountrySelection")
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
        expect(countriesApi.url(mockedSettings)()).toEqual("<REACT_APP_API_BASEURL>/amido/GB/en/v1")
    })
})
