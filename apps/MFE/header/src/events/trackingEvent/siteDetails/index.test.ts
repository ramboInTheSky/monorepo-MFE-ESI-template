/* eslint-disable @typescript-eslint/camelcase */
import {handleSiteDetails} from "."
import {publishSiteDetailsEvent} from ".."

jest.mock("../", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    publishSiteDetailsEvent: jest.fn(),
}))

describe("When data is supplied to Site Details Event", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it("should push the data to dataLayer", () => {
        const expectedEventData = {
            device_type: "mobile",
            site_layout: "mobile",
            site_country: "SA",
            site_language: "AR",
            domain_name: "fakeamido.com",
            channel_country: "Cape Verde",
            channel_country_code: "SA",
            channel_currency_code: "EUR",
        }

        handleSiteDetails({
            siteUrl: "fakeamido.com",
            fullTerritoryName: "Cape Verde",
            currencyCode: "EUR",
            territory: "SA",
            language: "AR",
            siteLayout: "mobile",
        })
        expect(publishSiteDetailsEvent).toHaveBeenCalledWith(expectedEventData)
    })
})
