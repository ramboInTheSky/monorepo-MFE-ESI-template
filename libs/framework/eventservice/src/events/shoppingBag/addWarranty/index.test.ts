/* eslint-disable @typescript-eslint/unbound-method */
import {AddWarranty, AddWarrantyCallback} from "."
import Emitter from "../../../eventEmitter"

jest.mock("../../../eventEmitter", () => ({
    emit: jest.fn(),
    listen: jest.fn(),
}))

describe("Given a Add_WarrantyBag ESB", () => {
    describe("When publishing", () => {
        const mockPublishData = {
            id: "1",
            optionNumber: "2",
            warrantyId: "3",
            warrantyOptionNumber: "4",
        }

        beforeAll(() => {
            const getBackEsb = new AddWarranty()
            getBackEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("SHOPPING_BAG_ADD_WARRANTY", mockPublishData)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const getBackEsb = new AddWarranty()
            getBackEsb.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("SHOPPING_BAG_ADD_WARRANTY", mockCallback)
        })
    })
})

describe("Given a AddWarrantyCallback ESB", () => {
    describe("When publishing", () => {
        const mockPublishData = {
            success: true,
            data: {},
            status: 123,
            textStatus: "test",
        }

        beforeAll(() => {
            const getBagCallbackEsb = new AddWarrantyCallback()
            getBagCallbackEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("SHOPPING_BAG_ADD_WARRANTY_CALLBACK", mockPublishData)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const getBagCallbackEsb = new AddWarrantyCallback()
            getBagCallbackEsb.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("SHOPPING_BAG_ADD_WARRANTY_CALLBACK", mockCallback)
        })
    })
})
