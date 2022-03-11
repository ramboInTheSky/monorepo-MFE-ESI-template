import React from "react"
import {render} from "@testing-library/react"
import {formatTextTestIds} from "@monorepo/utils"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import env from "../../config/env"
import {FacetCountLabel, FacetTooltipIcon, FacetLabelText} from "./components"
import {featDeliverBy, featAvailable} from "../../config/constants"

describe("Facet Components", () => {
    test("FacetCountLabel", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <FacetCountLabel>Test</FacetCountLabel>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    test("FacetTooltipIcon", () => {
        const handleTooltipOpen = jest.fn()
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <FacetTooltipIcon
                    onClick={handleTooltipOpen}
                    className="plp-facet-tooltip"
                    src={`${env.REACT_APP_BLOB_STORAGE_PATH}/icons/shared/help-question.svg`}
                    alt="SVG TEST"
                />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    test("FacetLabelText featAvailable", () => {
        const featV = featAvailable
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <FacetLabelText
                    data-testid={formatTextTestIds(`plp-facet-modal-label-${featV}`)}
                    title={featAvailable}
                    needsTruncating={false}
                />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("FacetLabelText featDeliverBy", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <FacetLabelText
                    data-testid={formatTextTestIds(`plp-facet-modal-label-${featDeliverBy}`)}
                    title={featDeliverBy}
                    needsTruncating
                />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
