import getBloomreachCookies from "."

describe("given a `getBloomreachCookies`", () => {
    describe("given a req with cookies", () => {
        it("should use the data from the req", () => {
            const expectedRes = {
                brUid2: "test uid 2",
                brMtSearch: "test mt search",
            }
            const request = {
                cookies: {
                    "_br_uid_2": "test uid 2",
                    "_br_mt_search": "test mt search",
                },
            }
            const result = getBloomreachCookies(request)
            expect(result).toEqual(expectedRes)
        })
    })
    describe("given a req without cookies", () => {
        it("should use the defaults", () => {
            const expectedRes = {
                brUid2: "uid%3D9624001141133%3Av%3D13.0%3Ats%3D1578565383488%3Ahc%3D138",
                brMtSearch: "",
            }
            const request = {}
            const result = getBloomreachCookies(request)
            expect(result).toEqual(expectedRes)
        })
    })
})
