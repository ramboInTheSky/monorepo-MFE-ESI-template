import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "@monorepo/themes"
import {Button} from "./component"

describe("CTA component: ", () => {
    it("should match the snapshot *", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <Button href="" disabled={false} showOpacity themeType="Primary" disableRipple>
                    Text
                </Button>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
