import React from "react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {render} from "@testing-library/react"
import {Container} from "./component"
import {mockTheme} from "../../../__mocks__/mockStore"

describe("MissionImageList components: ", () => {
    describe("Container: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Container />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
