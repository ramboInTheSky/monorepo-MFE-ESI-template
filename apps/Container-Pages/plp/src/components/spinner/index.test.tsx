import {render} from "@testing-library/react"
import React from "react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {Spinner, PrevNextSpinner} from "."

describe("Spinner", () => {
    it("should render as expected", () => {
        const props = {
            ariaValueText: "abc",
            testid: "testid_abc",
            realm: "amido",
        }
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <Spinner {...props} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
describe("PrevNextSpinner", () => {
    it("should render as expected", () => {
        const props = {
            ariaValueText: "abc",
            testid: "testid_abc",
            realm: "amido",
        }
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <PrevNextSpinner {...props} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
