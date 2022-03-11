import updateGender from "."
import { mockText } from "../../../../__mocks__/mockStore"

describe("UpdateGender ", () => {
    describe("with a single gender value", () => {
        it("should return the single gender correctly", () => {
            expect(updateGender(["women"], "en", mockText)).toEqual("Women's")
        })
    })

    describe("with multiple gender values", () => {
        it("should return the single gender value in the same set", () => {
            expect(updateGender(["girls", "newborngirls", "unisex", "babygirls"], "en", mockText)).toEqual("Girls'")
        })
    })

    describe("with multiple male gender values", () => {
        it("should return the single gender value in the same set", () => {
            expect(updateGender(["boys", "newbornboys", "babyboys"], "en", mockText)).toEqual("Boys'")
        })
    })

    describe("with multiple gender values in different sets", () => {
        it("should return all of the gender values if on english site", () => {
            expect(updateGender(["boys", "girls", "women", "men"], "en", mockText)).toEqual("Boys' Girls' Women's Men's")
        })

        it("should return all of the gender values if on non-english site", () => {
            expect(updateGender(["boys", "girls", "women", "men"], "fr", mockText)).toEqual("Boys', Girls', Women's, Men's")
        })
    })
})
