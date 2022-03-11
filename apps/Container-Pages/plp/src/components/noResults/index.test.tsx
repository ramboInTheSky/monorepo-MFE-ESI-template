import React from "react"
import {render, cleanup} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"
import {NoResults} from "."
import {mockText} from "../../../__mocks__/mockStore"

describe("NoResults: ", () => {
    afterEach(() => {
        cleanup()
    })
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <NoResults searchTerm="TEST SEARCH TERM" text={mockText}/>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
