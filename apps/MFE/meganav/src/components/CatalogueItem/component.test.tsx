import React from "react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {render} from "@testing-library/react"
import {Container} from "./component"
import {mockTheme} from "../../../__mocks__/mockStore"

describe("CatalogueItem component: ", () => {
    describe("Li ", () => {
        const props = {
            linkColour: "#fff",
            fontFamily: "",
            fontWeight: "",
            isDirectLink: true,
        }
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Container {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
        it("should match the snapshot if isDirectLink is false", () => {
            props.isDirectLink = false
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Container {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
        it("should match the snapshot if there is no linkColour", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Container {...props} linkColour={null} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
