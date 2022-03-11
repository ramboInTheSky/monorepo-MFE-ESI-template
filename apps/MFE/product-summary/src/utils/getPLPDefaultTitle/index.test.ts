import {getPLPDefaultTitle, getSearchKeyword} from "."
import {PLP_DEFAULT_TITLE_CONTAINER} from "../../config/constants"

describe("getPLPDefaultTitle", () => {
    afterEach(() => {
        document.querySelector("body")!.innerHTML = ""
    })

    describe("when called with correct div present", () => {
        beforeEach(() => {
            const newDiv = document.createElement("div")
            newDiv.setAttribute("id", PLP_DEFAULT_TITLE_CONTAINER)
            newDiv.setAttribute("data-default-title", "TEST TITLE")
            document.body.appendChild(newDiv)
        })

        it("Should return correct title for div", () => {
            const res = getPLPDefaultTitle()
            expect(res).toBe("TEST TITLE")
        })
    })

    describe("when called without incorrect present", () => {
        beforeEach(() => {
            const divId = "platform-modernisation"
            const newDiv = document.createElement("div")
            newDiv.setAttribute("id", divId)
            document.body.appendChild(newDiv)
        })

        it("Should return nothing for title", () => {
            getPLPDefaultTitle()
            const res = getPLPDefaultTitle()
            expect(res).toBe(undefined)
        })
    })
})

describe("Given a getSearchKeyword util", () => {
    describe("when on a search page with w query parameter", () => {
        it("should return w query parameter value", () => {
            const res = getSearchKeyword("http://nextwebsite.co.uk/search?w=abc", "?w=abc&isort=score&af=")
            expect(res).toBe("abc")
        })
    })
    describe("when on a search page without w query parameter", () => {
        it("should return empty string", () => {
            const res = getSearchKeyword(
                "http://nextwebsite.co.uk/search?param=abc&isort=score&af=",
                "?param=abc&isort=score&af=",
            )
            expect(res).toBe("")
        })
    })
})
