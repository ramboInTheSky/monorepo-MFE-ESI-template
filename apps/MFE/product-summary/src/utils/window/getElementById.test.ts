import {getElementById} from "./getElementById"

describe("Given a getElementById util function", () => {
  it("should return null if there is no element with the correct id", () => {
    const res = getElementById("0")
    expect(res).toBe(null)
  })
})