import {GoogleAnalyticsData} from "."

describe("Model - GoogleAnalytics Config: ", () => {
    it("Given a GoogleAnalyticsData,  it should match the GoogleAnalyticsData snapshot", () => {
        expect(new GoogleAnalyticsData()).toMatchSnapshot()
    })
})
