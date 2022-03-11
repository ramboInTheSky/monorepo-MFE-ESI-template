import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {StarRatingContainer} from "./component"

describe("Container component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <StarRatingContainer />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
