import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../__mocks__/mockStore"
import {Button} from "./component"

describe("CTA component: ", () => {
    it("should match the snapshot *", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <Button href="" disabled={false} showOpacity themeType="Primary" disableRipple>
                    fake
                </Button>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
