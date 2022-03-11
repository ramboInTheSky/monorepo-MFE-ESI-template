import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {SuitTitle} from "."

describe("Price: ", () => {
    const props = {
        title: "Black batman suit",
        linkUrl: "www.test.com",
        tooltipTitle: "test title",
    }

    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <SuitTitle {...props} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
