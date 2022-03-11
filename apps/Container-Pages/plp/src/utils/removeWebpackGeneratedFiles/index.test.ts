import {removeWebpackGeneratedCSS, removeWebpackGeneratedScripts} from "."

describe("isNumeric", () => {
    it("returns valid html without scripts", () => {
        const html = "<html><script src='someurl'> </script></html>"
        const result = removeWebpackGeneratedScripts(html)

        expect(result).toBe("<html></html>")
    })

    it("returns valid html without CSS", () => {
        const html = "<html><head><link rel='somethingelse' href='someotherurl' /><link href='someurl' /></head> </html>"
        const result = removeWebpackGeneratedCSS(html)

        expect(result).toBe("<html><head><link rel='somethingelse' href='someotherurl' /></head> </html>")
    })

   
})
