import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {Container, Title} from "./component"
import {mockTheme} from "../../../__mocks__/mockStore"

describe("PrimaryNavItem component: ", () => {
    describe("Li ", () => {
        it("should match the snapshot without overriding marketing styles ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Container isActive marketingStyles={{} as any} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("Title ", () => {
        it("should match the snapshot with overriding marketing styles", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Title
                        isActive
                        marketingStyles={{linkColour: "#999", fontWeight: "700", fontFamily: "Gothic Sans"}}
                    />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
