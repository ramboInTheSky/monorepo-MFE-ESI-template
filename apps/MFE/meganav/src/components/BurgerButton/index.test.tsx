import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"

import {BurgerButton} from "."
import {mockTheme} from "../../../__mocks__/mockStore"

describe("Components - BurgerButton: ", () => {
    it("should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <BurgerButton />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
