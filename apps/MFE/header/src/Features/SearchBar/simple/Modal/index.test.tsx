import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../../../__mocks__/mockStore"
import SimpleModal, {ModalProps} from "."

const Fake = () => <div> fake </div>

jest.mock("../../../../components/Modal", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: ({children}) => <div data-testid="modal">Modal Component {children}</div>,
}))

describe("Components - Modal: ", () => {
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
                <SimpleModal {...props}>
                    <Fake />
                </SimpleModal>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
