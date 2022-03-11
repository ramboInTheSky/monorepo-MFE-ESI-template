import React from "react"
import {render} from "@testing-library/react"
import Drawer, {DrawerProps} from "."
import {mockText} from "../../../__mocks__/mockStore"

describe("Components - Drawer: ", () => {
    let props: Omit<DrawerProps, "children">
    beforeEach(() => {
        props = {
            open: true,
            onClose: jest.fn(),
            anchor: "left",
            text: mockText.drawer,
        }
    })
    it("should match the snapshot", () => {
        const {asFragment} = render(
            <Drawer {...props}>
                <div> dummy </div>
            </Drawer>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
