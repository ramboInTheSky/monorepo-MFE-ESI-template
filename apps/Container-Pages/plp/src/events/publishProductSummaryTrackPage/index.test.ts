import {ProductSummaryTrackPage} from "@monorepo/eventservice"
import publishProductSummaryTrackPage from "."

jest.mock("@monorepo/eventservice")

describe("Given a publishProductSummaryTrackPage event", () => {
    it("should call ProductSummaryTrackPage", () => {
        const ids = [
            {itemNumber: "1", index: 1},
            {itemNumber: "2", index: 2},
            {itemNumber: "3", index: 3},
        ]
        publishProductSummaryTrackPage(ids)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(ProductSummaryTrackPage.prototype.publish).toHaveBeenCalled()
    })
})
