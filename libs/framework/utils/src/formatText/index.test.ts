import {replaceText, formatTextTestIds} from "."

describe("Util: replaceText", () => {
    it("should replace <username>", () => {
        const paragraph = "Not <username>?"
        const replaceValue = "John"
        const regex = /<username>/gi
        expect(replaceText(paragraph, replaceValue, regex)).toEqual("Not John?")
    })
    it("should replace any spaces and set them as lowercase text", () => {
        const paragraph = "footer-example-Privacy & Legal"
        expect(formatTextTestIds(paragraph)).toEqual("footer-example-privacy-&-legal")
    })
})
