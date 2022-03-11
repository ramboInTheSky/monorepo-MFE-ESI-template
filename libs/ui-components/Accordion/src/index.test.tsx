import React from "react"
import {render} from "@testing-library/react"

import Accordion from "."

const props = {
    title: "Title 1",
    titleColor: "red",
    border: "1px solid blue",
    arrowIconUrl: "http://superman.com/icon/arrow.png",
}

describe("Common/Accordion: ", () => {
    it("should match the snapshot template with <h1> tag ", () => {
        const {asFragment} = render(
            <Accordion {...props}>
                <h1>Hello World</h1>
            </Accordion>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot template with h1 component ", () => {
        const {getByText, unmount} = render(
            <Accordion {...props}>
                <h1>Test</h1>
            </Accordion>,
        )
        expect(getByText("Test")).toBeInTheDocument()
        unmount()
    })
    it("should match the snapshot template when accordion is opened ", () => {
        const newProps = {
            ...props,
            expanded: true,
        }
        const {asFragment} = render(
            <Accordion {...newProps}>
                <h1>Test</h1>
            </Accordion>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should match the snapshot with panelPadding prop ", () => {
        const newProps = {
            ...props,
            expanded: true,
            panelPadding: "1rem",
        }
        const {asFragment} = render(
            <Accordion {...newProps}>
                <h1>Test</h1>
            </Accordion>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
