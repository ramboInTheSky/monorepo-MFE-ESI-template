import React from "react"
import {render, cleanup} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {PlpContainer} from "."
import {useUrlListener} from "../../hooks/useUrlListener"

jest.mock("../../hooks/useUrlListener", () => ({
    useUrlListener: jest.fn(),
}))

const mockLoadPageFn = jest.fn()

describe("Container: ", () => {
    afterEach(() => {
        cleanup()
    })

    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <PlpContainer loadPageFromUrl={mockLoadPageFn}>
                    <div>Test</div>
                </PlpContainer>
                ,
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should call url listener hook", () => {
        expect(useUrlListener).toHaveBeenCalledWith(mockLoadPageFn)
    })
})
