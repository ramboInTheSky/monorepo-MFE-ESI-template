import React from "react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {render} from "@testing-library/react"
import {Container} from "./components"
import {mockTheme} from "../../../__mocks__/mockStore"

describe("components: Favourites", () => {
    it("should match the snapshot Container", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <Container />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
