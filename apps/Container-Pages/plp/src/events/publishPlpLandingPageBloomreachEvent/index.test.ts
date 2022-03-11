import {PageLandingESB} from "@monorepo/eventservice"
import {publishPlpLandingPageBloomreachEvent} from "."

jest.mock("@monorepo/eventservice")

describe("Given a `hydrate product summary` event", () => {
    it("should call HydrateProductSummaryESB", () => {
        publishPlpLandingPageBloomreachEvent({})
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(PageLandingESB.prototype.publish).toHaveBeenCalled()
    })
})
