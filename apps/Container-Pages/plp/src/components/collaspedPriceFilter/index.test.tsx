import React from "react"
import {render} from "@testing-library/react"
import {CollaspedPriceFilter} from "."

import {FilterPrice} from "../../models/Filter"
import {mockText} from "../../../__mocks__/mockStore"

describe("CollaspedPriceFilter component", () => {
    it("should render the component", () => {
        const props = {
            locale: "en-GB",
            realm: "amido",
            priceFilter: {
                currencyCode: "GBP",
                displayName: "",
                isFilterOpen: false,
                max: 100,
                min: 0,
                name: "Test2 with options",
                selectedMax: 70,
                selectedMin: 30,
                type: "price",
            } as FilterPrice,
            text: mockText,
        }
        const {asFragment} = render(<CollaspedPriceFilter {...props} />)

        expect(asFragment()).toMatchSnapshot()
    })
})
