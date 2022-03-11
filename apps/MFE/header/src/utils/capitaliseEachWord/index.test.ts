import {capitaliseEachWord} from "."

describe("capitaliseEachWord", () => {
    it("Should capitalise each word of the string", () => {
        const text = "testing is an awesome resource"
        expect(capitaliseEachWord(text)).toEqual("Testing Is An Awesome Resource")
    })
    it("Should capitalise each word of the string even they are capitalised", () => {
        const text = "Red Dress"
        expect(capitaliseEachWord(text)).toEqual("Red Dress")
    })
    it("Should capitalise and strip out empty space at the end", () => {
        const text = "Red Dress "
        expect(capitaliseEachWord(text)).toEqual("Red Dress")
    })
    it("Should capitalise and strip out empty space at the start", () => {
        const text = " Blue tie"
        expect(capitaliseEachWord(text)).toEqual("Blue Tie")
    })
    it("Should capitalise each word of the string even with symbols", () => {
        const text = " Blue tie£"
        expect(capitaliseEachWord(text)).toEqual("Blue Tie£")
    })
    it("Should not capitalise with slash and numbers", () => {
        const text = "/123456"
        expect(capitaliseEachWord(text)).toEqual("/123456")
    })
    it("Should not capitalise with asterisk", () => {
        const text = "*"
        expect(capitaliseEachWord(text)).toEqual("*")
    })
    it("Should not capitalise with percentage signs after", () => {
        const text = "dress%20"
        expect(capitaliseEachWord(text)).toEqual("Dress%20")
    })
    it("Should not capitalise with percentage signs before and after", () => {
        const text = "%dress%20"
        expect(capitaliseEachWord(text)).toEqual("%dress%20")
    })
    it("Should not capitalise with just spaces", () => {
        const text = "    "
        expect(capitaliseEachWord(text)).toEqual("")
    })
})
