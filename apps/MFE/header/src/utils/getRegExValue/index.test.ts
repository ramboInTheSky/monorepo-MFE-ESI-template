import {getRegExValue, escapeRegex} from "."

describe("Utils: getRegExValue() - ", () => {
    it("when the string starts with text 'NextVisitor', returns the text matching the regex expression", () => {
        const expectedValue =
            "LatestSessionID=54dd6d71ad704f118fe4ffed7aaac07c&LatestSessionTimestamp=30/01/2020 11:30:00&ID=b90dac902bcc43e98e36d9c925ca07a7"
        const valueIn =
            "NextVisitor=LatestSessionID=54dd6d71ad704f118fe4ffed7aaac07c&LatestSessionTimestamp=30/01/2020 11:30:00&ID=b90dac902bcc43e98e36d9c925ca07a7"
        const regExPattern = "=([^;]+)"
        const key = "NextVisitor"
        const result = getRegExValue(valueIn, key, regExPattern)
        expect(result).toEqual(expectedValue)
    })
    it("when the string starts with text 'LatestSessionID', returns the text matching the regex expression", () => {
        const expectedValue = "54dd6d71ad704f118fe4ffed7aaac07c"
        const valueIn =
            "LatestSessionID=54dd6d71ad704f118fe4ffed7aaac07c&LatestSessionTimestamp=30/01/2020 11:30:00&ID=b90dac902bcc43e98e36d9c925ca07a7"
        const regExPattern = "=(.*)&LatestSessionTimestamp"
        const key = "LatestSessionID"
        const result = getRegExValue(valueIn, key, regExPattern)
        expect(result).toEqual(expectedValue)
    })
    it("when the string don't match the regex expression, returns null(Pattern 1)", () => {
        const expectedValue = null
        const valueIn =
            "TestCookie=LatestSessionID=54dd6d71ad704f118fe4ffed7aaac07c&LatestSessionTimestamp=30/01/2020 11:30:00&ID=b90dac902bcc43e98e36d9c925ca07a7"
        const regExPattern = "=([^;]+)"
        const key = "NextVisitor"
        const result = getRegExValue(valueIn, key, regExPattern)
        expect(result).toEqual(expectedValue)
    })
    it("when the string don't match the regex expression, returns null(Pattern 2)", () => {
        const expectedValue = null
        const valueIn =
            "TestSessionID=54dd6d71ad704f118fe4ffed7aaac07c&LatestSessionTimestamp=30/01/2020 11:30:00&ID=b90dac902bcc43e98e36d9c925ca07a7"
        const regExPattern = "=(.*)&LatestSessionTimestamp"
        const key = "LatestSessionID"
        const result = getRegExValue(valueIn, key, regExPattern)
        expect(result).toEqual(expectedValue)
    })
    it("when null value is passed in, the function should return null", () => {
        const expectedValue = null
        const valueIn = null
        const regExPattern = "=([^;]+)"
        const key = "NextVisitor"
        const result = getRegExValue(valueIn, key, regExPattern)
        expect(result).toEqual(expectedValue)
    })
    it("when https://amido.com value is passed in, the function should return amido.com", () => {
        const expectedValue = "amido.com"
        const valueIn = "https://amido.com"
        const regExPattern = "^https?://([^/?#]+)(?:[/?#]|$)"
        const key = ""
        const result = getRegExValue(valueIn, key, regExPattern)
        expect(result).toEqual(expectedValue)
    })
    it("when http://amido.com value is passed in, the function should return amido.com", () => {
        const expectedValue = "amido.com"
        const valueIn = "http://amido.com"
        const regExPattern = "^https?://([^/?#]+)(?:[/?#]|$)"
        const key = ""
        const result = getRegExValue(valueIn, key, regExPattern)
        expect(result).toEqual(expectedValue)
    })
    it("when 9** value is passed in, the function should return 9\\*\\* with the escapes", () => {
        const expectedValue = "9\\*\\*"
        const valueIn = "9**"
        const result = escapeRegex(valueIn)
        expect(result).toEqual(expectedValue)
    })
    it("when 9* value is passed in, the function should return 9\\*\\* with the escapes", () => {
        const expectedValue = "9\\*"
        const valueIn = "9*"
        const result = escapeRegex(valueIn)
        expect(result).toEqual(expectedValue)
    })
    it("when AB*dasd* value is passed in, the function should return AB\\*dasd\\* with the escapes", () => {
        const expectedValue = "AB\\*dasd\\*"
        const valueIn = "AB*dasd*"
        const result = escapeRegex(valueIn)
        expect(result).toEqual(expectedValue)
    })
})
