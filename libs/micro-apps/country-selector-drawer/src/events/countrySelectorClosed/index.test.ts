/* eslint-disable @typescript-eslint/unbound-method */
import {CountrySelectorClosedESB} from "@monorepo/eventservice"
import PublishCountrySelectorClosed, {SubscribeCountrySelectorClosed} from "."

jest.mock("@monorepo/eventservice")

describe("Given a Country Selector Closed event", () => {
    it("should call CountrySelectorClosedESB", () => {
        PublishCountrySelectorClosed()
        expect(CountrySelectorClosedESB.prototype.publish).toHaveBeenCalled()
    })
})

describe("Given a SubscribeCountrySelectorClosed", () => {
    it("should call the subscribe ESB", () => {
        const mockCB = jest.fn()
        SubscribeCountrySelectorClosed(mockCB)

        expect(CountrySelectorClosedESB.prototype.subscribe).toHaveBeenCalledWith(mockCB)
    })
})
