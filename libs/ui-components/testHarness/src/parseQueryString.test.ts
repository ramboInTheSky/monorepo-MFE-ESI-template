import {parseQueryString} from "./parseQueryString"

describe("ParseQueryString utility", () => {
    it("should return an empty object if the string is empty", () => {
        expect(parseQueryString("")).toEqual({})
    })

    it("should return an empty object if the string is of the wrong format", () => {
        expect(parseQueryString("some string")).toEqual({})
    })

    it("should return a key-value pair of query parameters", () => {
        expect(parseQueryString("?a=1&b=2&c=%5C%25%C2%A3%5E")).toEqual({
            a: "1",
            b: "2",
            c: "\\%£^"
        })
    })
})