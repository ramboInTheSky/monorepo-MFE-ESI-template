/* eslint-disable */
import {JSDOM} from "jsdom"
import {toString, calcScrollWidthAndScroll, isSelected} from "."
import {formatTextTestIds} from "@monorepo/utils"

const dom = new JSDOM(`<!DOCTYPE html><p></p>`)
window = dom.window
document = dom.window.document

describe("calcScrollWidthAndScroll", () => {
    beforeAll(() => {
        const divId = "meganav-entrypoint"
        const newDiv = document.createElement("div")
        newDiv.setAttribute("id", divId)
        newDiv.setAttribute("style", "padding:0;")
        newDiv.style.setProperty = jest.fn()
        document.body.appendChild(newDiv)

        const ulId = "snail-trail-container"
        const newUL = document.createElement("ul")
        newUL.setAttribute("id", ulId)
        const links = ["Girls", "Women", "Kids", "Gifts & Flowers"]
        links.forEach(element => {
            const li = document.createElement("li")
            li.setAttribute("class", "item")
            li.setAttribute("data-testId", formatTextTestIds(`meganav-primarynav-link-${element})`))
            li.innerHTML += element
            li.textContent = element
            newUL.appendChild(li)
        })
        newUL.style.setProperty = jest.fn()
        // eslint-disable-next-line no-unused-expressions
        document.getElementById(divId)?.appendChild(newUL)
    })
    it("Should update the meganav entry point", () => {
        calcScrollWidthAndScroll()
        // eslint-disable-next-line  @typescript-eslint/unbound-method
        expect(document.getElementById("meganav-entrypoint")?.style.setProperty).toHaveBeenCalledWith(
            "--display-primary-nav",
            "1",
        )
    })
    it("should have toString representation", () => {
        expect(toString()).toBeTruthy()
    })
})

describe("isSelected function", () => {
    it("should return false if selected dept has different textContent", () => {
        const el = document.createElement("li")
        el.textContent = "women"
        const selectedDept = "Girls"
        expect(isSelected(selectedDept, el)).toBe(false)
    })
    it("should return true if selected dept has same textContent", () => {
        const el = document.createElement("li")
        el.textContent = "gifts & flowers"
        const selectedDept = "Gifts & Flowers"
        expect(isSelected(selectedDept, el)).toBe(true)
    })
})
