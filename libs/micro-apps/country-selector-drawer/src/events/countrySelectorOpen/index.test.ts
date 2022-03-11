/* eslint-disable @typescript-eslint/unbound-method */
import {CountrySelectorOpenESB} from "@monorepo/eventservice"
import PublishCountrySelectorOpen from "."

jest.mock("@monorepo/eventservice")

describe("Given a Country Selector Open event", () => {
    it("should call CountrySelectorOpenESB", () => {
        const testEventData = {test: 1}
        PublishCountrySelectorOpen(testEventData as any)
        expect(CountrySelectorOpenESB.prototype.publish).toHaveBeenCalledWith(testEventData)
    })
})
