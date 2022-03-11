import {getCookieValue} from "."

describe("Util: getCookie", () => {
    it("should get name", () => {
        const getKey = "name"
        const cookieList = "name=superman;lastname=spiderman"
        const expectedResult = "superman"

        expect(getCookieValue(getKey, cookieList)).toEqual(expectedResult)
    })
    it("should not get name", () => {
        const getKey = "name"
        const cookieList = "age=12;lastname=spiderman"
        const expectedResult = ""

        expect(getCookieValue(getKey, cookieList)).toEqual(expectedResult)
    })
})
