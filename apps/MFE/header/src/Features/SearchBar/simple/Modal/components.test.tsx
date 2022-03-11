import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../../../__mocks__/mockStore"
import {Wrapper} from "./components"

describe("Modal component: ", () => {
    describe("Wrapper: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Wrapper>
                        <h1>Example</h1>
                    </Wrapper>
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
