import React from "react"
import {Provider} from "react-redux"
import {render, screen, fireEvent} from "@testing-library/react"
import Drawer, {DrawerProps} from "."
import mockStore, {mockText} from "../../../__mocks__/mockStore"

const {drawerIconAltText} = mockText

jest.mock("../../config/urls", () => ({
    drawerCloseIcon: "samplelink",
    drawerIconAltText: "sampleAltText",
}))

describe("Components - Drawer: ", () => {
    let props: Omit<DrawerProps, "children">
    beforeEach(() => {
        props = {
            open: false,
            onClose: jest.fn(),
            text: {drawerIconAltText: mockText.drawerIconAltText},
            anchor: "left",
            showCloseIcon: false,
        }
    })
    it("should match the snapshot", () => {
        const {asFragment} = render(
            <Provider store={mockStore}>
                <Drawer {...props}>
                    <div> dummy </div>
                </Drawer>
            </Provider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("Should show close icon", () => {
        render(
            <Provider store={mockStore}>
                <Drawer {...props} showCloseIcon>
                    <div> dummy </div>
                </Drawer>
            </Provider>,
        )

        const image = screen.getByAltText(drawerIconAltText)
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute("src", "samplelink")
    })
    it("Should not show close icon", () => {
        render(
            <Provider store={mockStore}>
                <Drawer {...props} showCloseIcon={false}>
                    <div> dummy </div>
                </Drawer>
            </Provider>,
        )
        const image = screen.queryByAltText(drawerIconAltText)
        expect(image).not.toBeInTheDocument()
    })
    it("Should show document on open", () => {
        render(
            <Provider store={mockStore}>
                <Drawer {...props} open>
                    <div> dummy </div>
                </Drawer>
            </Provider>,
        )
        const drawer = screen.getByTestId("drawer")
        expect(drawer).toBeVisible()
    })
    it("Should not show document on close", () => {
        const text = "dummy"
        render(
            <Provider store={mockStore}>
                <Drawer {...props} open={false}>
                    <div> {text} </div>
                </Drawer>
            </Provider>,
        )
        const drawer = screen.getByTestId("drawer")
        expect(drawer).not.toBeVisible()
    })

    it("Should close drawer when close icon is clicked", () => {
        render(
            <Provider store={mockStore}>
                <Drawer {...props} open showCloseIcon>
                    <div> dummy </div>
                </Drawer>
            </Provider>,
        )
        const image = screen.getByAltText(drawerIconAltText)
        fireEvent.click(image)
        expect(props.onClose).toBeCalledTimes(1)
    })
})
