import React from "react"
import {render} from "@testing-library/react"
import {GlobalStyle} from "./GlobalStyle"

describe("Given some Global Styles", () => {
    describe("When rendering on a page", () => {
        it("should attach expected CSS rules to the header", () => {
            render(<GlobalStyle />)
            const styleTags = document.head.getElementsByTagName("style")
            expect(styleTags).toMatchSnapshot()
        })
    })
})
