import api from "."

import {mockDateConstructor} from "../../../../__mocks__/setDate"

describe("Config - endpoints - autocomplete - getAutocompleteData: ", () => {
    beforeEach(() => mockDateConstructor(new Date("2019-12-08T07:00:00.000Z")))
    const autoCompleteApi = api("getAutocompleteData")
    it("should return the correct internal endpoint", () => {
        const searchValue = "Socks"
        const accountId = "accountId"
        const domainKey = "domainKey"
        const authKey = "authKey"
        const uid2 = "uid2"
        const date = "123456789"
        expect(autoCompleteApi.localEndpoint(searchValue, accountId, date, domainKey, authKey, uid2)).toEqual(
            `?account_id=${accountId}&auth_key=${authKey}&domain_key=${domainKey}&request_id=${date}&_br_uid_2=${uid2}&request_type=suggest&q=${searchValue}`,
        )
    })
    it("should return the correct method", () => {
        expect(autoCompleteApi.method).toEqual("get")
    })
    it("should return the correct routeDefinition", () => {
        expect(autoCompleteApi.routeDefinition).toEqual("/autocomplete")
    })
})
