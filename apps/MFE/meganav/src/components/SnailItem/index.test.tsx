import React from "react"
import {render, fireEvent} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {SnailItem, SnailItemProps} from "."
import {mockTheme} from "../../../__mocks__/mockStore"

describe("SnailItem", () => {
    let props: SnailItemProps
    let component
    beforeEach(() => {
        props = {
            title: "sample",
            target: "/sampler",
            path: "test",
            handleClick: jest.fn(),
            handleMouseEnter: jest.fn(),
            handleKeyboardEnter: jest.fn(),
            scrollToPosition: jest.fn(),
            isActive: true,
            index: 1,
            fontWeight: undefined,
            fontFamily: undefined,
            linkColour: undefined,
            siteUrl: "http://IamSiteUrl",
            classNames: "",
            total: 2,
            showSecondaryNavArrow: false,
        }
        component = render(
            <SCThemeProvider theme={mockTheme}>
                <SnailItem {...props} />
            </SCThemeProvider>,
        )
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(() => null),
                setItem: jest.fn(() => null),
                removeItem: jest.fn(() => null),
            },
            writable: true,
        })
    })
    it("should match the snapshot", () => {
        expect(component.asFragment()).toMatchSnapshot()
    })
    it("should trigger function on click ", () => {
        const snailItem = component.getByText(props.title)
        fireEvent.click(snailItem)
        expect(props.handleClick).toHaveBeenCalledTimes(1)
    })
    it("should trigger function on mouseenter ", () => {
        const snailItem = component.getByText(props.title)
        fireEvent.mouseEnter(snailItem)
        expect(props.handleMouseEnter).toHaveBeenCalledTimes(1)
    })
    it("should have expected anchor tag attributes", () => {
        const snailItem = component.getByText(props.title)
        const anchorTag = snailItem.closest("a")
        expect(anchorTag).toHaveAttribute("href", `${props.siteUrl}${props.target}`)
        expect(anchorTag).toHaveAttribute("title", props.title)
    })
})
