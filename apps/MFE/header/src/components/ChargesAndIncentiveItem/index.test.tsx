import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../__mocks__/mockStore"
import {ChargesAndIncentive} from "../../models/shoppingbag"
import ChargesAndIncentiveItem, {ChargesAndIncentiveItemProps} from "."

describe("Components - ChargesAndIncentiveItem: ", () => {
    describe("Incentive in the Bag- ChargesAndIncentiveItem: ", () => {
        let props: ChargesAndIncentiveItemProps
        const discount = 10
        beforeEach(() => {
            props = {
                incentive: {
                    AdditionalAmount: -discount,
                    AdditionalAmountFormatted: `-£${discount.toFixed(2)}`,
                    AdditionalCode: "UKCO1",
                    MaximumOrderValue: 0,
                    MinimumOrderValue: 15,
                    OfferShortDescription: "Welcome Offer",
                    OfferTypeDescription: "Welcome Offer",
                    Type: "PRO",
                } as ChargesAndIncentive,
            }
        })

        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <ChargesAndIncentiveItem {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
