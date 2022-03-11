import {getRegExValue} from ".."

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

    describe("get Cookies", () => {
        const originalDocumentCookie = document.cookie
        const regExPattern = "=([^;]+)"
        beforeEach(() => {
            document.cookie = "AmidoDeviceType=Desktop"
            document.cookie = "ExampleOne=1"
            document.cookie = "ExampleTwo=2"
            document.cookie = "ExampleThree=3"
            document.cookie = "ExampleFour=4"
            document.cookie = "ExampleFive=5"
        })
        afterEach(() => {
            document.cookie = originalDocumentCookie
        })
        it("should get Desktop value from cookie storage when searching for AmidoDeviceType", () => {
            const key = "AmidoDeviceType"
            expect(getRegExValue(document.cookie, key, regExPattern)).toEqual("Desktop")
        })
        it("should get 1 value from cookie storage when searching for ExampleOne", () => {
            const key = "ExampleOne"
            expect(getRegExValue(document.cookie, key, regExPattern)).toEqual("1")
        })
        it("should get 2 value from cookie storage when searching for ExampleTwo", () => {
            const key = "ExampleTwo"
            expect(getRegExValue(document.cookie, key, regExPattern)).toEqual("2")
        })
        it("should get 3 value from cookie storage when searching for ExampleThree", () => {
            const key = "ExampleThree"
            expect(getRegExValue(document.cookie, key, regExPattern)).toEqual("3")
        })

        it("should get null from cookie storage when searching for AAA", () => {
            const key = "AAA"
            expect(getRegExValue(document.cookie, key, regExPattern)).toEqual(null)
        })
        it("should get null from cookie storage when searching for Examplefive", () => {
            const key = "Examplefive"
            expect(getRegExValue(document.cookie, key, regExPattern)).toEqual(null)
        })
    })
})
