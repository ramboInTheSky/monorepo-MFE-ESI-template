import {joinArrayBasedOnLanguage} from "."

describe("Given `joinArrayBasedOnLanguage`", () => {
  it("should return a joined string without commas if the language is english", () => {
    const arr1 = ["Black", "Dresses", "Women", "Amido"]

    const result = joinArrayBasedOnLanguage("en", arr1)
    expect(result).toEqual("Black Dresses Women Amido")
  })
  it("should return a joined string with commas if the language is not english", () => {
    const arr1 = ["Black", "Dresses", "Women", "Amido"]

    const result = joinArrayBasedOnLanguage("fr", arr1)
    expect(result).toEqual("Black, Dresses, Women, Amido")
  })
})