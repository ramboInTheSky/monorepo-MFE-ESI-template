/* eslint-disable @typescript-eslint/unbound-method */
import {GetBag, GetBagCallback} from "."
import Emitter from "../../../eventEmitter"

jest.mock("../../../eventEmitter", () => ({
    emit: jest.fn(),
    listen: jest.fn(),
}))

describe("Given a GetBag ESB", () => {
    describe("When publishing", () => {
        const mockPublishData = {
            guestAccountConverted: true,
        }

        beforeAll(() => {
            const getBackEsb = new GetBag()
            getBackEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("SHOPPING_BAG_GET", mockPublishData)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const getBackEsb = new GetBag()
            getBackEsb.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("SHOPPING_BAG_GET", mockCallback)
        })
    })
})

describe("Given a GetBagCallback ESB", () => {
    describe("When publishing", () => {
        const mockPublishData = {
            success: true,
            data: {},
            status: 123,
            textStatus: "test",
        }

        beforeAll(() => {
            const getBagCallbackEsb = new GetBagCallback()
            getBagCallbackEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("SHOPPING_BAG_GET_CALLBACK", mockPublishData)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const getBagCallbackEsb = new GetBagCallback()
            getBagCallbackEsb.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("SHOPPING_BAG_GET_CALLBACK", mockCallback)
        })
    })
})
