import React from "react"
import {render} from "@testing-library/react"
import {FilterSearchInput} from "."
import { mockText } from "../../../__mocks__/mockStore"

describe("FilterSearchInput:", () => {
    it("should render correctly", () => {
        const {asFragment} = render(<FilterSearchInput displayName="test display name" text={mockText} />)
        expect(asFragment()).toMatchSnapshot()
    })

    it("should render correctly with params", () => {
        const {asFragment} = render(<FilterSearchInput displayName="test display name" params={{test: "test"}} text={mockText} />)
        expect(asFragment()).toMatchSnapshot()
    })
})
