/* eslint-disable @typescript-eslint/unbound-method */
import { UpgradeVisitorToken } from "."
import Emitter from "../../../eventEmitter"

jest.mock("../../../eventEmitter", () => ({
    emit: jest.fn(),
    listen: jest.fn(),
}))

describe("Given a UpgradeVisitorToken ESB", () => {
    describe("When publishing", () => {
        beforeAll(() => {
            const getVisitorTokenEsb = new UpgradeVisitorToken()
            getVisitorTokenEsb.publish({})
        })

        const data = {}
        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("VISITOR_TOKEN_UPGRADE", data)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const getVisitorTokenEsb = new UpgradeVisitorToken()
            getVisitorTokenEsb.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("VISITOR_TOKEN_UPGRADE", mockCallback)
        })
    })
})
