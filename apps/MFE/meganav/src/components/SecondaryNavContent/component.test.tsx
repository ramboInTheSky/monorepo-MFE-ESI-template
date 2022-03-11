import React from "react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {render} from "@testing-library/react"
import {Container, CatalogueContainer, CatalogueAndMissionsContainer} from "./component"

import {mockTheme} from "../../../__mocks__/mockStore"

describe("SecondaryNavContent component: ", () => {
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
    describe("CatalogueAndMissionsContainer: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<CatalogueAndMissionsContainer />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("CatalogueContainer: ", () => {
        it("should match the snapshot when hasMissions and hasBanner are true", () => {
            const {asFragment} = render(<CatalogueContainer hasMissions hasBanner />)
            expect(asFragment()).toMatchSnapshot()
        })
        it("should match the snapshot when hasMissions is false and hasBanner is true", () => {
            const {asFragment} = render(<CatalogueContainer hasMissions={false} hasBanner />)
            expect(asFragment()).toMatchSnapshot()
        })
        it("should match the snapshot when hasMissions is true and hasBanner is false", () => {
            const {asFragment} = render(<CatalogueContainer hasMissions hasBanner={false} />)
            expect(asFragment()).toMatchSnapshot()
        })
        it("should match the snapshot hasMissions and hasBanner are false", () => {
            const {asFragment} = render(<CatalogueContainer hasMissions={false} hasBanner={false} />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
