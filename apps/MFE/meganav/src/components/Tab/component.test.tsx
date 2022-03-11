import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {Container, ContainerProps} from "./component"
import {mockTheme} from "../../../__mocks__/mockStore"

describe("Tab components: ", () => {
    describe("Container: ", () => {
        it("should match the snapshot ", () => {
            const props: ContainerProps = {isActive: true}
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Container {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
