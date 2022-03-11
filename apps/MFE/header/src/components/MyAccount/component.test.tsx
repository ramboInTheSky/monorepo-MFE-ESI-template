import React from "react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {render} from "@testing-library/react"
import {
    SignoutButton,
    Container,
    IconContainer,
    ViewAccountSummaryLink,
    ToolTipContent,
    Username,
    StyledHr,
    SmallIconContainer,
} from "./component"
import {mockTheme} from "../../../__mocks__/mockStore"

describe("components: MyAccountLink", () => {
    it("should match the snapshot Username", () => {
        const {asFragment} = render(<Username />)
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot Container", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <Container />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should match the snapshot IconTextContainer", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <IconContainer showContainer />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot IconTextContainer when showContainer is false", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <IconContainer showContainer={false} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot SmallIconContainer", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <SmallIconContainer />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot ViewAccountSummaryLink", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <ViewAccountSummaryLink />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should match the snapshot SignoutButton", () => {
        const {asFragment} = render(<SignoutButton />)
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot hr", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <StyledHr />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot ToolTip", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <ToolTipContent />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
