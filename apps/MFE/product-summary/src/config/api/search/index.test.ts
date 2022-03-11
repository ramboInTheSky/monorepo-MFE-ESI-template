import api from "."

describe("Config - endpoints - search - getApi: ", () => {
    describe("getTypeSummary", () => {
        const searchApi = api("getTypeSummary")
        it("should return the correct internal endpoint", () => {
            expect(searchApi.localEndpoint("123", "suit")).toEqual("/suit/123")
        })
        it("should return the correct method", () => {
            expect(searchApi.method).toEqual("get")
        })
        it("should return the correct routeDefinition", () => {
            expect(searchApi.routeDefinition).toEqual("/:type/:itemNumber")
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
            expect(searchApi.url(mockedSettings)("123", "suit")).toEqual("superman/Amido/GB/en/v1/suits/123")
        })
    })
})
