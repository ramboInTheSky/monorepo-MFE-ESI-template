/* eslint-disable @typescript-eslint/unbound-method */
import {HydrateProductSummaryESB} from "."
import Emitter from "../../../eventEmitter"

jest.mock("../../../eventEmitter", () => ({
    emit: jest.fn(),
    listen: jest.fn(),
}))

describe("Given a HydrateProductSummaryESB", () => {
    describe("When publishing", () => {
        beforeAll(() => {
            const countrySelectorEsb = new HydrateProductSummaryESB()
            countrySelectorEsb.publish()
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("PRODUCT_SUMMARY_HYDRATE", undefined)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const hydrateProductSummaryESB = new HydrateProductSummaryESB()
            hydrateProductSummaryESB.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("PRODUCT_SUMMARY_HYDRATE", mockCallback)
        })
    })
})
