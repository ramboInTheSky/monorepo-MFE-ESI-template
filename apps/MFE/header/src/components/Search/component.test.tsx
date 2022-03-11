import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {SearchArea, CloseButton, BigScreenContainer, IconContainer} from "./component"
import {mockTheme} from "../../../__mocks__/mockStore"
import {SupportedSearchBar} from "../../models/features/searchBar"

describe("Search components: ", () => {
    describe("SearchArea: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <SearchArea />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("CloseButton: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <CloseButton> dummy </CloseButton>
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("BigScreenContainer: ", () => {
        it(`should match the snapshot - searchbartype = ${SupportedSearchBar.EnrichSearch} and open = true`, () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <BigScreenContainer searchbartype={SupportedSearchBar.EnrichSearch} open />,
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
        it(`should match the snapshot - searchbartype = ${SupportedSearchBar.EnrichSearch} and open = false`, () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <BigScreenContainer searchbartype={SupportedSearchBar.EnrichSearch} open={false} />,
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
        it(`should match the snapshot - searchbartype = ${SupportedSearchBar.SimpleSearch} and open = true `, () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <BigScreenContainer searchbartype={SupportedSearchBar.SimpleSearch} open />,
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
        it(`should match the snapshot - searchbartype ${SupportedSearchBar.SimpleSearch} and open = false `, () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <BigScreenContainer searchbartype={SupportedSearchBar.SimpleSearch} open={false} />,
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("IconContainer: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <IconContainer />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
