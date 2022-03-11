import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {ModalTitle, ModalToolbar, StyledModal, ModalBody, ModalConfirmButton} from "./components"

describe("Snapshots - View All Modal", () => {
    test("ModalTitle", () => {
        const {asFragment} = render(<ModalTitle>Test</ModalTitle>)
        expect(asFragment()).toMatchSnapshot()
    })
    test("ModalToolbar", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ModalToolbar>Test</ModalToolbar>
            </ThemeProvider>
        )
        expect(asFragment()).toMatchSnapshot()
    })
    test("StyledModal", () => {
        const {asFragment} = render(
            <StyledModal open>
                <div />
            </StyledModal>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    test("ModalBody", () => {
        const {asFragment} = render(<ModalBody>Test</ModalBody>)
        expect(asFragment()).toMatchSnapshot()
    })
    test("ModalConfirmButton", () => {
        const {asFragment} = render(<ModalConfirmButton>Test</ModalConfirmButton>)
        expect(asFragment()).toMatchSnapshot()
    })
})
