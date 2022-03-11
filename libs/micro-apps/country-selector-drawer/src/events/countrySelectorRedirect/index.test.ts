/* eslint-disable @typescript-eslint/unbound-method */
import {CountrySelectorRedirectESB} from "@monorepo/eventservice"
import PublishCountrySelectorRedirect, {SubscribeCountrySelectorRedirect} from "."

jest.mock("@monorepo/eventservice")

describe("Given a Country Selector Redirect event", () => {
    it("should call PublishCountrySelectorRedirect", () => {
        PublishCountrySelectorRedirect()
        expect(CountrySelectorRedirectESB.prototype.publish).toHaveBeenCalled()
    })
})

describe("Given a SubscribeCountrySelectorRedirect", () => {
    it("should call the subscribe ESB", () => {
        const mockCB = jest.fn()
        SubscribeCountrySelectorRedirect(mockCB)

        expect(CountrySelectorRedirectESB.prototype.subscribe).toHaveBeenCalledWith(mockCB)
    })
})
