import React from "react"
import {render, screen} from "@testing-library/react"
import {Banner} from "."
import {mockText} from "../../../__mocks__/mockStore"

describe("Components - Banner: ", () => {
    let props
    beforeEach(() => {
        props = {
            imageUrl: "/sampleimageurl",
            target: "/sampletarget",
            text: {bannerAltText: mockText.bannerAltText},
            siteUrl: "https://amido.com/en/gb",
        }
    })
    it("should match the snapshot", () => {
        const {asFragment} = render(<Banner {...props} />)
        expect(asFragment()).toMatchSnapshot()
    })
    it("should have an image in document", () => {
        render(<Banner {...props} />)
        const image = screen.getByRole("img")
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute("src", props.imageUrl)
    })
    it("should have an alt in image in document", () => {
        render(<Banner {...props} />)
        const image = screen.getByRole("img")
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute("alt", props.text.bannerAltText)
    })
    it("should have a clickable image in document", () => {
        render(<Banner {...props} />)
        const anchorTag = screen.getByRole("img").closest("a")
        expect(anchorTag).toBeInTheDocument()
        expect(anchorTag).toHaveAttribute("href", "/en/gb/sampletarget")
    })
})
