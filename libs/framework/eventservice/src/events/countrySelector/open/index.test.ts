/* eslint-disable @typescript-eslint/unbound-method */
import {CountrySelectorOpenESB} from "."
import Emitter from "../../../eventEmitter"

jest.mock("../../../eventEmitter", () => ({
    emit: jest.fn(),
    listen: jest.fn(),
}))

describe("Given a CountrySelectorOpenESB ESB", () => {
    describe("When publishing", () => {
        const mockPublishData = {
            isoCountryCode: "mx",
        }

        beforeAll(() => {
            const countrySelectorEsb = new CountrySelectorOpenESB()
            countrySelectorEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("COUNTRY_SELECTOR_OPEN", mockPublishData)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const countrySelectorEsb = new CountrySelectorOpenESB()
            countrySelectorEsb.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("COUNTRY_SELECTOR_OPEN", mockCallback)
        })
    })
})
