import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {Container} from "./component"
import {mockTheme} from "../../../__mocks__/mockStore"

describe(" components: QuickLinksContainer ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <Container />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
