import api from "."

describe("Config - endpoints - countryRedirect - getGeolocationData: ", () => {
    const getGeolocationData = api("getGeolocationData")
    it("should return the correct internal endpoint", () => {
        expect(getGeolocationData.localEndpoint(1234)).toEqual(`/NX/CountryRedirect?ipaddress=1234`)
    })
    it("should return the correct method", () => {
        expect(getGeolocationData.method).toEqual("get")
    })
    it("should return the correct routeDefinition", () => {
        expect(getGeolocationData.routeDefinition).toEqual("")
    })
})

describe("Config - endpoints - countryRedirect - sessionUpdate: ", () => {
    const sessionUpdate = api("sessionUpdate")
    it("should return the correct internal endpoint", () => {
        expect(sessionUpdate.localEndpoint()).toEqual(`/CountryRedirect/Update`)
    })
    it("should return the correct method", () => {
        expect(sessionUpdate.method).toEqual("post")
    })
    it("should return the correct routeDefinition", () => {
        expect(sessionUpdate.routeDefinition).toEqual("")
    })
})
