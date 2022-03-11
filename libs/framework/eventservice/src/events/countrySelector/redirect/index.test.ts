/* eslint-disable @typescript-eslint/unbound-method */
import {CountrySelectorRedirectESB} from "."
import Emitter from "../../../eventEmitter"

jest.mock("../../../eventEmitter", () => ({
    emit: jest.fn(),
    listen: jest.fn(),
}))

describe("Given a CountrySelectorRedirectESB ESB", () => {
    describe("When publishing", () => {
        beforeAll(() => {
            const countrySelectorEsb = new CountrySelectorRedirectESB()
            countrySelectorEsb.publish()
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("COUNTRY_SELECTOR_REDIRECT", undefined)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const countrySelectorEsb = new CountrySelectorRedirectESB()
            countrySelectorEsb.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("COUNTRY_SELECTOR_REDIRECT", mockCallback)
        })
    })
})
