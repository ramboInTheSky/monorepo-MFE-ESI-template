import {render} from "@testing-library/react"
import React from "react"
import {ThemeProvider} from "styled-components"
import {Provider} from "react-redux"

import TabbedFeatFacet from "."
import mockStore, {mockTheme} from "../../../../__mocks__/mockStore"

describe("Given a TabbedFeatFacet component", () => {
    it("should render correctly to match the snapshot", () => {
        const {asFragment} = render(
            <Provider store={mockStore}>
                <ThemeProvider theme={mockTheme}>
                    <TabbedFeatFacet filters={["opt1"]} />
                </ThemeProvider>
            </Provider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
