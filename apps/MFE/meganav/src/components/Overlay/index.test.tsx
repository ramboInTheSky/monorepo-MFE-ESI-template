import React from "react"
import {render, screen, waitForElement} from "@testing-library/react"
import Overlay, {OverlayProps} from "."

jest.useFakeTimers()
jest.mock("../../config/constants", () => ({
    OVERLAY_TIMEOUT: 30,
    PRIMARY_NAV_ITEM_HOVER_DELAY: 0,
}))
const Fake = () => <div> fake </div>

describe("Components - Overlay: ", () => {
    let props: Omit<OverlayProps, "children">
    beforeEach(() => {
        props = {
            open: false,
            handleClose: jest.fn(),
        }
    })
    it("should match the snapshot", () => {
        const {asFragment} = render(
            <Overlay {...props}>
                <Fake />
            </Overlay>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("Should be visible when open state is true", async () => {
        render(
            <Overlay {...props} open>
                <Fake />
            </Overlay>,
        )
        jest.advanceTimersByTime(300)
        const got = await waitForElement(() => screen.getByTestId("overlay"))
        expect(got).toBeVisible()
        expect(got).toContainHTML("<div> fake </div>")
    })
})
