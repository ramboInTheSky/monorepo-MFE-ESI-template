import {HydrateProductSummaryESB} from "@monorepo/eventservice"
import {publishProductSummaryHydrate} from "."

jest.mock("@monorepo/eventservice")

describe("Given a `hydrate product summary` event", () => {
    it("should call HydrateProductSummaryESB", () => {
        publishProductSummaryHydrate()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(HydrateProductSummaryESB.prototype.publish).toHaveBeenCalled()
    })
})
