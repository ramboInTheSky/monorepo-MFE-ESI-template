import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {FacetsFeats} from "."
import Facets from "../facets"

jest.mock("../facets", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: jest.fn(() => <div>Facets</div>),
}))

describe("Facets - Feats: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <FacetsFeats name="VALUE 1" />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
        expect(Facets).toHaveBeenCalledWith(
            {
                facetName: "VALUE 1",
            },
            {},
        )
    })
})
