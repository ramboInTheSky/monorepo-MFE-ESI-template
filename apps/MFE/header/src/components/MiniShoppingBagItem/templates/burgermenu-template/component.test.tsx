import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {ProductDetails, StatusWrapper} from "./component"
import {mockTheme} from "../../../../../__mocks__/mockStore"
import {IN_STOCK} from "../../../../config/constants"

describe(" components: GridW100PR16 ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(<ProductDetails />)
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("StatusWrapper ", () => {
    it("should match the snapshot with In stock status", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <StatusWrapper status={IN_STOCK} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
