import React from "react"
import {render, screen} from "@testing-library/react"
import Icon from "."

describe("Components - Icon: ", () => {
    let props
    beforeEach(() => {
        props = {imageUrl: "/sample-image-url", altText: "sample-alt-text", rotationDegrees: 10}
    })
    it("should match the snapshot", () => {
        const {asFragment} = render(<Icon {...props} />)
        expect(asFragment()).toMatchSnapshot()
    })
    it("should have required attributes", () => {
        render(<Icon {...props} />)
        const IconElement = screen.getByRole("img")
        expect(IconElement).toHaveAttribute("src", props.imageUrl)
        expect(IconElement).toHaveAttribute("alt", props.altText)
        expect(IconElement).toHaveStyle(`transform: rotateZ(${props.rotationDegrees}deg)`)
    })
})
