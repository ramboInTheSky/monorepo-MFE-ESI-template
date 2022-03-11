import { getRegExValue } from "."

describe("Utils: getRegExValue() - ", () => {
  it("when the string starts with text 'AmidoVisitor', returns the text matching the regex expression", () => {
    const expectedValue =
      "LatestSessionID=54dd6d71ad704f118fe4ffed7aaac07c&LatestSessionTimestamp=30/01/2020 11:30:00&ID=b90dac902bcc43e98e36d9c925ca07a7"
    const valueIn =
      "AmidoVisitor=LatestSessionID=54dd6d71ad704f118fe4ffed7aaac07c&LatestSessionTimestamp=30/01/2020 11:30:00&ID=b90dac902bcc43e98e36d9c925ca07a7"
    const regExPattern = "=([^;]+)"
    const key = "AmidoVisitor"
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
    const key = "AmidoVisitor"
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
    const key = "AmidoVisitor"
    const result = getRegExValue(valueIn, key, regExPattern)
    expect(result).toEqual(expectedValue)
  })
})
