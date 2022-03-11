/* eslint-disable @typescript-eslint/unbound-method */
import {TrackEvent} from "@monorepo/eventservice"
import {PublishTrackEvent} from "."

jest.mock("@monorepo/eventservice")

describe("Given a gtm Event", () => {
    const data = {
        event: "favourites",
        favourites: {
            category: "favourites",
            action: "GTM_ERROR_ADD_FAVOURITES",
            label: "title",
            option: "itemNumber",
        },
    }

    afterEach(() => {
        jest.resetAllMocks()
    })
    it("should call PublishTrackEvent successfully", () => {
        PublishTrackEvent("favourites", data)
        expect(TrackEvent.prototype.publish).toHaveBeenCalledWith({event: "favourites", data})
    })
})
