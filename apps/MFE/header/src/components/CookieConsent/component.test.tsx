import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../__mocks__/mockStore"
import {Container, StyledTitle, Link, StyledIcon} from "./component"

describe("Container component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <Container />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("StyledTitle component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <StyledTitle variant="h5">Title</StyledTitle>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Link component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <Link href="/testurl">Link</Link>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("StyledIcon component: ", () => {
    it("should match the snapshot if selected", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <StyledIcon src="/abc/abe.svg" alt="icon" />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
