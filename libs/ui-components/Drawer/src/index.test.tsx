import React from "react"
import {render} from "@testing-library/react"
import {Drawer, DrawerProps} from "."

const props: DrawerProps = {
    open: true,
    anchor: "left",
    onClose: () => null,
    closeImageSource: "https://xcdn.amido.com/content/platmod/icons/shared/close-white.svg",
    closeImageAltText: "Close",
    children: <div>Test Content 2</div>,
    dataGaV1: "Event Category",
    dataGaV2: "Event Name",
    ModalProps: {
        keepMounted: true,
        disableRestoreFocus: true,
        disableAutoFocus: true,
        disableEnforceFocus: true,
        closeAfterTransition: false,
        disablePortal: true,
        disableScrollLock: true,
    },
}

describe("Drawer: ", () => {
    it("should match the snapshot template with test props", () => {
        const {asFragment} = render(<Drawer {...props} />)
        expect(asFragment()).toMatchSnapshot()
    })

    it("should render drawer container", () => {
        const {queryByTestId} = render(<Drawer {...props} />)
        const drawerContainer = queryByTestId("drawer-container")
        expect(drawerContainer).toBeInTheDocument()
    })
})
