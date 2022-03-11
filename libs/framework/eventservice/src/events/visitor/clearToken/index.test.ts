/* eslint-disable @typescript-eslint/unbound-method */
import { ClearVisitorToken } from "."
import Emitter from "../../../eventEmitter"

jest.mock("../../../eventEmitter", () => ({
    emit: jest.fn(),
    listen: jest.fn(),
}))

describe("Given a ClearVisitorToken ESB", () => {
    describe("When publishing", () => {
        beforeAll(() => {
            const getVisitorTokenEsb = new ClearVisitorToken()
            getVisitorTokenEsb.publish()
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("VISITOR_TOKEN_CLEAR", undefined)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const getVisitorTokenEsb = new ClearVisitorToken()
            getVisitorTokenEsb.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("VISITOR_TOKEN_CLEAR", mockCallback)
        })
    })
})
