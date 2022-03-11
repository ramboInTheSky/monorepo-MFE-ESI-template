import React from "react"
import {render, fireEvent, screen} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../__mocks__/mockStore"
import Modal, {ModalProps} from "."

const Fake = () => <div> fake </div>

jest.mock("../../utils/handlePropagation", () => {
    return {
        handlePropagation: jest.fn(),
    }
})

describe("Components - Modal: ", () => {
    let props: Omit<ModalProps, "children">
    beforeEach(() => {
        props = {
            open: true,
            handleClose: jest.fn(),
        }
    })
    it("should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <Modal {...props}>
                    <Fake />
                </Modal>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot when hideBackdrop is true", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <Modal {...props} hideBackdrop>
                    <Fake />
                </Modal>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("Should be visible when open state is true", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <Modal {...props}>
                    <Fake />
                </Modal>
            </SCThemeProvider>,
        )
        const got = screen.getByTestId("modal")
        expect(got).toHaveStyle("visibility:visible")
        expect(got).toContainHTML("<div> fake </div>")
    })

    it("Should call handleClose function when backdrop is clicked", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <Modal {...props}>
                    <Fake />
                </Modal>
                ,
            </SCThemeProvider>,
        )
        const backdrop = screen.getByTestId("modal").firstChild as HTMLElement
        fireEvent.click(backdrop)
        expect(props.handleClose).toHaveBeenCalledTimes(1)
    })
})
