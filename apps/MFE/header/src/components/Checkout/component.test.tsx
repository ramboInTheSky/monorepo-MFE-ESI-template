import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {Container} from "./component"
import {mockTheme} from "../../../__mocks__/mockStore"

describe("Checkout component: ", () => {
    it("should match the snapshot when isinternationalcountry is false ", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <Container isinternationalcountry={false} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should match the snapshot when isinternationalcountry is true ", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <Container isinternationalcountry />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
