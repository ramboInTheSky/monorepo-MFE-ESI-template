import {excludeIncentives} from "."
import {ChargesAndIncentive} from "../../models/shoppingbag"

describe("Exclude Incentives", () => {
    const incentives = [
        {
            AdditionalAmount: -10.0,
            AdditionalCode: "UKC01",
            OfferTypeDescription: "Welcome Offer",
            OfferShortDescription: "Welcome Offer",
            Type: "PRO",
            MinimumOrderValue: 15.0,
            MaximumOrderValue: 0.0,
            AdditionalAmountFormatted: "-£10.00",
        } as ChargesAndIncentive,
        {
            AdditionalAmount: -10.0,
            AdditionalCode: "UKC01",
            OfferTypeDescription: "Welcome Offer",
            OfferShortDescription: "Welcome Offer",
            Type: "CTC",
            MinimumOrderValue: 15.0,
            MaximumOrderValue: 0.0,
            AdditionalAmountFormatted: "-£10.00",
        } as ChargesAndIncentive,
        {
            AdditionalAmount: -10.0,
            AdditionalCode: "UKC01",
            OfferTypeDescription: "Welcome Offer",
            OfferShortDescription: "Welcome Offer",
            Type: "CSR",
            MinimumOrderValue: 15.0,
            MaximumOrderValue: 0.0,
            AdditionalAmountFormatted: "-£10.00",
        } as ChargesAndIncentive,
        {
            AdditionalAmount: -10.0,
            AdditionalCode: "UKC01",
            OfferTypeDescription: "Welcome Offer",
            OfferShortDescription: "Welcome Offer",
            Type: "CMO",
            MinimumOrderValue: 15.0,
            MaximumOrderValue: 0.0,
            AdditionalAmountFormatted: "-£10.00",
        } as ChargesAndIncentive,
    ]

    it("Should exclude incentives that have CMO, CSR and CTC as type", () => {
        const expectedIncentives = [
            {
                AdditionalAmount: -10.0,
                AdditionalCode: "UKC01",
                OfferTypeDescription: "Welcome Offer",
                OfferShortDescription: "Welcome Offer",
                Type: "PRO",
                MinimumOrderValue: 15.0,
                MaximumOrderValue: 0.0,
                AdditionalAmountFormatted: "-£10.00",
            } as ChargesAndIncentive,
        ]

        expect(excludeIncentives(incentives)).toEqual(expectedIncentives)
    })
})
