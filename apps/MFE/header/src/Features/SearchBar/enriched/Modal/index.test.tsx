import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../../../__mocks__/mockStore"
import EnrichModal, {ModalProps} from "."

const Fake = () => <div> fake </div>

jest.mock("../../../../components/Modal", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div data-testid="modal">Modal Component</div>,
}))

describe("Components - EnrichModal: ", () => {
    let props: Omit<ModalProps, "children">
    beforeEach(() => {
        props = {
            open: false,
            closeText: "Close",
            handleClose: jest.fn(),
        }
    })
    it("should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <EnrichModal {...props}>
                    <Fake />
                </EnrichModal>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
