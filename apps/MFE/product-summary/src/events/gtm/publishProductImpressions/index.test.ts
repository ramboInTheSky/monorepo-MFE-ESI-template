import {ProductSummaryToDataLayer} from "@monorepo/eventservice"
import {publishProductImpressions} from "."

jest.mock("@monorepo/eventservice")

describe("Given a `hydrate product summary` event", () => {
    it("should call ProductSummaryToDataLayer", () => {
        publishProductImpressions("testData", {})
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(ProductSummaryToDataLayer.prototype.publish).toHaveBeenCalled()
    })
})
