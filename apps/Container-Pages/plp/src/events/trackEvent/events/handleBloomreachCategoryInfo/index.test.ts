import {handleBloomreachCategoryInfo} from "."
import {publishPlpLandingPageBloomreachEvent} from "../../../publishPlpLandingPageBloomreachEvent"

jest.mock("../../../publishPlpLandingPageBloomreachEvent", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    publishPlpLandingPageBloomreachEvent: jest.fn(),
}))

describe("Given a handleBloomreachCategoryInfo", () => {
    describe("When all parameters are supplied", () => {
        beforeEach(() => {
            jest.clearAllMocks()
        })
        it("should push the parameters to dataLayer", () => {
            const expectedEventData = {
                id: "test id",
                name: "test",
            }

            handleBloomreachCategoryInfo({
                id: "test id",
                name: "test",
            })
            expect(publishPlpLandingPageBloomreachEvent).toHaveBeenCalledWith(expectedEventData)
        })
        it("should push the encoded parameters to dataLayer when there is something to encode", () => {
            const expectedEventDataToEncode = {
                id: "test id",
                name: "test%20name",
            }

            handleBloomreachCategoryInfo({
                id: "test id",
                name: "test name",
            })
            expect(publishPlpLandingPageBloomreachEvent).toHaveBeenCalledWith(expectedEventDataToEncode)
        })

        it("should not push to dataLayer when there is no data", () => {
            handleBloomreachCategoryInfo({
                id: "",
                name: "",
            })
            expect(publishPlpLandingPageBloomreachEvent).not.toHaveBeenCalled()
        })
    })
})
