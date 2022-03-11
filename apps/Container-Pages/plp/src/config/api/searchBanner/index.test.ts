import api from "."

describe("Config - endpoints - searchBanners - getApi: ", () => {
    const searchBannersApi = api("getSearchBanner")
    it("should return the correct method", () => {
        expect(searchBannersApi.method).toEqual("get")
    })
    it("should return the correct routeDefinition", () => {
        expect(searchBannersApi.routeDefinition).toEqual("/search-banners/*")
    })
    it("should return the correct internal endpoint", () => {
        expect(searchBannersApi.localEndpoint("test")).toEqual("/search-banners/test")
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
        expect(searchBannersApi.url(mockedSettings)("1234")).toEqual("banneresiurl/Amido/GB/en/v1/search-banners/1234")
    })
})
