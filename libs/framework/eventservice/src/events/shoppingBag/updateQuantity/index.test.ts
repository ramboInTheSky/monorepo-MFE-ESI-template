/* eslint-disable @typescript-eslint/unbound-method */
import {UpdateQuantity, UpdateQuantityCallback} from "."
import Emitter from "../../../eventEmitter"

jest.mock("../../../eventEmitter", () => ({
    emit: jest.fn(),
    listen: jest.fn(),
}))

describe("Given a UpdateQuantity ESB", () => {
    describe("When publishing", () => {
        const mockPublishData = {
            id: "1",
            quantity: 2,
        }

        beforeAll(() => {
            const getBackEsb = new UpdateQuantity()
            getBackEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("SHOPPING_BAG_UPDATE_QUANTITY", mockPublishData)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const getBackEsb = new UpdateQuantity()
            getBackEsb.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("SHOPPING_BAG_UPDATE_QUANTITY", mockCallback)
        })
    })
})

describe("Given a UpdateQuantityCallback ESB", () => {
    describe("When publishing", () => {
        const mockPublishData = {
            success: true,
            data: {},
            status: 123,
            textStatus: "test",
        }

        beforeAll(() => {
            const getBagCallbackEsb = new UpdateQuantityCallback()
            getBagCallbackEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("SHOPPING_BAG_UPDATE_QUANTITY_CALLBACK", mockPublishData)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const getBagCallbackEsb = new UpdateQuantityCallback()
            getBagCallbackEsb.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("SHOPPING_BAG_UPDATE_QUANTITY_CALLBACK", mockCallback)
        })
    })
})
