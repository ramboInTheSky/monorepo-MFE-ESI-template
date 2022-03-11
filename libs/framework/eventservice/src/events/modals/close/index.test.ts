/* eslint-disable @typescript-eslint/unbound-method */
import {ModalsCloseESB} from "."
import Emitter from "../../../eventEmitter"

jest.mock("../../../eventEmitter", () => ({
    emit: jest.fn(),
    listen: jest.fn(),
}))

describe("Given a ModalsCloseESB ESB", () => {
    describe("When publishing", () => {
        beforeAll(() => {
            const modalsCloseESB = new ModalsCloseESB()
            modalsCloseESB.publish()
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("MODALS_CLOSE", undefined)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const modalsCloseESB = new ModalsCloseESB()
            modalsCloseESB.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("MODALS_CLOSE", mockCallback)
        })
    })
})
