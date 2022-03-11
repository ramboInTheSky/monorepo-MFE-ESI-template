import {getSettingsHeaders, getSettingsHeadersAsObject, getCustomHeader} from "."

describe("getSettingsHeadersAsObject", () => {
    describe("When headers has data", () => {
        const headers = {
            "x-monorepo-language": "en",
            "x-monorepo-realm": "Amido",
            "x-monorepo-territory": "GB",
            "x-monorepo-correlation-id": "aaa-bbb-ccc",
            "x-monorepo-viewport-size": "desktop",
            "x-monorepo-persona": "personaStub",
            "x-monorepo-time-machine-date": "timeMachineStub",
        }
        it("should return the data", () => {
            expect(getSettingsHeadersAsObject(headers)).toMatchSnapshot()
        })
    })
})

describe("getSettingsHeaders", () => {
    describe("When headers has data", () => {
        const headers = {
            "x-monorepo-language": "en",
            "x-monorepo-realm": "Amido",
            "x-monorepo-territory": "GB",
            "x-monorepo-correlation-id": "aaa-bbb-ccc",
            "x-monorepo-viewport-size": "desktop",
            "x-monorepo-persona": "personaStub",
            "x-monorepo-time-machine-date": "timeMachineStub",
            "x-monorepo-siteurl": "http://test.com",
        }
        it("should return the data", () => {
            expect(getSettingsHeaders(headers)).toMatchSnapshot()
        })
    })

    describe("When headers have no data for persona", () => {
        const headers = {
            "x-monorepo-language": "en",
            "x-monorepo-realm": "Amido",
            "x-monorepo-territory": "GB",
            "x-monorepo-correlation-id": "aaa-bbb-ccc",
            "x-monorepo-viewport-size": "desktop",
        }
        it("should return the data with no persona header", () => {
            expect(getSettingsHeaders(headers)).toEqual({
                "x-monorepo-language": "en",
                "x-monorepo-realm": "Amido",
                "x-monorepo-territory": "GB",
                "x-monorepo-correlation-id": "aaa-bbb-ccc",
                "x-monorepo-viewport-size": "desktop",
                "x-monorepo-siteurl": "",
            })
        })
    })
    describe("When headers have no data for time machine", () => {
        const headers = {
            "x-monorepo-language": "en",
            "x-monorepo-realm": "Amido",
            "x-monorepo-territory": "GB",
            "x-monorepo-correlation-id": "aaa-bbb-ccc",
            "x-monorepo-viewport-size": "desktop",
            "x-monorepo-persona": "personaStub",
        }
        it("should return the data with no persona header", () => {
            expect(getSettingsHeaders(headers)).toEqual({
                "x-monorepo-language": "en",
                "x-monorepo-realm": "Amido",
                "x-monorepo-territory": "GB",
                "x-monorepo-correlation-id": "aaa-bbb-ccc",
                "x-monorepo-viewport-size": "desktop",
                "x-monorepo-persona": "personaStub",
                "x-monorepo-siteurl": "",
            })
        })
    })
})

describe("getSettingsHeadersAsObject Catching", () => {
    describe("When headers has no data", () => {
        const headers = undefined
        it("should throw an error when headers had missing data", () => {
            expect(() => getSettingsHeadersAsObject(headers)).toThrowError()
        })
    })
    describe("When headers has no Realm", () => {
        it("should throw an error when headers has no realm", () => {
            const headers = {
                "x-monorepo-language": "en",
                "x-monorepo-territory": "GB",
            }
            expect(() => getSettingsHeadersAsObject(headers)).toThrowError()
        })
        it("should throw an error when headers has realm as empty string", () => {
            const headers = {
                "x-monorepo-language": "en",
                "x-monorepo-realm": "",
                "x-monorepo-territory": "GB",
            }
            expect(() => getSettingsHeadersAsObject(headers)).toThrowError()
        })
    })
    describe("When headers has no Territory", () => {
        it("should throw an error when headers has no territory", () => {
            const headers = {
                "x-monorepo-language": "en",
                "x-monorepo-realm": "Amido",
            }
            expect(() => getSettingsHeadersAsObject(headers)).toThrowError()
        })
        it("should throw an error when headers has Territory as empty string", () => {
            const headers = {
                "x-monorepo-language": "en",
                "x-monorepo-realm": "Amido",
                "x-monorepo-territory": "",
            }
            expect(() => getSettingsHeadersAsObject(headers)).toThrowError()
        })
    })
    describe("When headers has no Language", () => {
        it("should throw an error when headers returns no language", () => {
            const headers = {
                "x-monorepo-realm": "Amido",
                "x-monorepo-territory": "GB",
            }
            expect(() => getSettingsHeadersAsObject(headers)).toThrowError()
        })
        it("should throw an error when headers returns language as empty string", () => {
            const headers = {
                "x-monorepo-language": "",
                "x-monorepo-realm": "Amido",
                "x-monorepo-territory": "GB",
            }
            expect(() => getSettingsHeadersAsObject(headers)).toThrowError()
        })
    })
})

describe("getSettingsHeaders Catching", () => {
    describe("When headers has no data", () => {
        const headers = undefined
        it("should throw an error when headers had missing data", () => {
            expect(() => getSettingsHeaders(headers)).toThrowError()
        })
    })
    describe("When headers has no Realm", () => {
        it("should throw an error when headers has no realm", () => {
            const headers = {
                "x-monorepo-language": "en",
                "x-monorepo-territory": "GB",
                "x-monorepo-correlation-id": "aaa-bbb-ccc",
            }
            expect(() => getSettingsHeaders(headers)).toThrowError()
        })
        it("should throw an error when headers has realm as empty string", () => {
            const headers = {
                "x-monorepo-language": "en",
                "x-monorepo-realm": "",
                "x-monorepo-territory": "GB",
                "x-monorepo-correlation-id": "aaa-bbb-ccc",
            }
            expect(() => getSettingsHeaders(headers)).toThrowError()
        })
    })
    describe("When headers has no Territory", () => {
        it("should throw an error when headers has no territory", () => {
            const headers = {
                "x-monorepo-language": "en",
                "x-monorepo-realm": "Amido",
                "x-monorepo-correlation-id": "aaa-bbb-ccc",
            }
            expect(() => getSettingsHeaders(headers)).toThrowError()
        })
        it("should throw an error when headers has Territory as empty string", () => {
            const headers = {
                "x-monorepo-language": "en",
                "x-monorepo-realm": "Amido",
                "x-monorepo-territory": "",
                "x-monorepo-correlation-id": "aaa-bbb-ccc",
            }
            expect(() => getSettingsHeaders(headers)).toThrowError()
        })
    })
    describe("When headers has no Language", () => {
        it("should throw an error when headers returns no language", () => {
            const headers = {
                "x-monorepo-realm": "Amido",
                "x-monorepo-territory": "GB",
                "x-monorepo-correlation-id": "aaa-bbb-ccc",
            }
            expect(() => getSettingsHeaders(headers)).toThrowError()
        })
        it("should throw an error when headers returns language as empty string", () => {
            const headers = {
                "x-monorepo-language": "",
                "x-monorepo-realm": "Amido",
                "x-monorepo-territory": "GB",
                "x-monorepo-correlation-id": "aaa-bbb-ccc",
            }
            expect(() => getSettingsHeaders(headers)).toThrowError()
        })
    })
})

describe("getCustomHeader", () => {
    it("should return null if customHeader is not passed through", () => {
        const headers = {
            "x-monorepo-language": "en",
            "x-monorepo-realm": "Amido",
            "x-monorepo-territory": "GB",
            "x-monorepo-correlation-id": "aaa-bbb-ccc",
        }
        expect(getCustomHeader(headers, "x-monorepo-customHeader")).toEqual({
            "x-monorepo-customHeader": undefined,
        })
    })
    it("should return the customHeader", () => {
        const headers = {
            "x-monorepo-language": "",
            "x-monorepo-realm": "Amido",
            "x-monorepo-territory": "GB",
            "x-monorepo-correlation-id": "aaa-bbb-ccc",
            "x-monorepo-customHeader": "customData",
        }
        expect(getCustomHeader(headers, "x-monorepo-customHeader")).toEqual({
            "x-monorepo-customHeader": "customData",
        })
    })
})
