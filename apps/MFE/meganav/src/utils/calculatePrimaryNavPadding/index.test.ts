import {calcPrimaryNavLinkMetrics, toString} from "."

describe("calcPrimaryNavLinkMetrics", () => {
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
        const links = ["Electronics Watch", "House wear Items", "Kids wear", "Women Fashion"]
        links.forEach(element => {
            const li = document.createElement("li")
            li.setAttribute("class", "item")
            li.innerHTML += element
            newUL.appendChild(li)
        })
        newUL.style.setProperty = jest.fn()
        // eslint-disable-next-line no-unused-expressions
        document.getElementById(divId)?.appendChild(newUL)
    })

    it("Should recalculate the nav link metrics", () => {
        calcPrimaryNavLinkMetrics()
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
