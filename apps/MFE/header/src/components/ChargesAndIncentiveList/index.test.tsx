import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../__mocks__/mockStore"
import {ChargesAndIncentive} from "../../models/shoppingbag"
import ChargesAndIncentiveList, {ChargesAndIncentiveListProps} from "."

describe("Components - ChargesAndIncentiveList: ", () => {
    describe("Incentives in the Bag- ChargesAndIncentiveList: ", () => {
        let props: ChargesAndIncentiveListProps
        const discount = 10
        beforeEach(() => {
            props = {
                incentives: [
                    {
                        AdditionalAmount: -discount,
                        AdditionalAmountFormatted: `-£${discount.toFixed(2)}`,
                        AdditionalCode: "UKCO1",
                        MaximumOrderValue: 0,
                        MinimumOrderValue: 15,
                        OfferShortDescription: "Welcome Offer",
                        OfferTypeDescription: "Welcome Offer",
                        Type: "PRO",
                    } as ChargesAndIncentive,
                ],
            }
        })

        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <ChargesAndIncentiveList {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
