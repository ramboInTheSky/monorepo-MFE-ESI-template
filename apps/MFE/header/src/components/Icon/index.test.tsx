import React from "react"
import {render, screen} from "@testing-library/react"
import Icon, {IconProps} from "."

describe("Components - Icon: ", () => {
    let props: IconProps
    beforeEach(() => {
        props = {
            src: "https://bla/amido",
            alt: "alternate text",
        }
    })
    it("should match the snapshot", () => {
        const {asFragment} = render(<Icon {...props} />)
        expect(asFragment()).toMatchSnapshot()
    })
    it("should have required attributes", () => {
        render(<Icon {...props} />)
        const got = screen.getByRole("img")
        expect(got).toHaveAttribute("src", props.src)
        expect(got).toHaveAttribute("alt", props.alt)
    })
})
