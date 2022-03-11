import React from "react"
import {render} from "@testing-library/react"
import {FacetsGridContainer, FacetsGridList, FacetsGridListItem} from "./components"

describe("Snapshots - Facets Grid", () => {
    test("FacetsGridContainer", () => {
        const {asFragment} = render(<FacetsGridContainer>Test</FacetsGridContainer>)
        expect(asFragment()).toMatchSnapshot()
    })

    test("FacetsGridList", () => {
        const {asFragment} = render(<FacetsGridList>Test</FacetsGridList>)
        expect(asFragment()).toMatchSnapshot()
    })

    test("FacetsGridListItem", () => {
        const {asFragment} = render(<FacetsGridListItem>Test</FacetsGridListItem>)
        expect(asFragment()).toMatchSnapshot()
    })
})
