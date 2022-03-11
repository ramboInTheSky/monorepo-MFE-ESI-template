import React from "react"
import {render} from "@testing-library/react"
import {CollaspedFilter} from "."

describe('CollaspedFilter component', () => {
    it('should render the component', () => {
        const props = {
            filteredFacets: {
                ABC: ["123", "234"],
                DEF: ["123", "234"],
                ert: ["123", "234"],
            },
        }
        const {asFragment} = render(<CollaspedFilter {...props}/>)

        expect(asFragment()).toMatchSnapshot()
    })
})