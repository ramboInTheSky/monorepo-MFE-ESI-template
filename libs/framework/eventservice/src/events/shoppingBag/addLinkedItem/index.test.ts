/* eslint-disable @typescript-eslint/unbound-method */
import {AddLinkedItem, AddLinkedItemCallback} from "."
import Emitter from "../../../eventEmitter"

jest.mock("../../../eventEmitter", () => ({
    emit: jest.fn(),
    listen: jest.fn(),
}))

describe("Given a Add_LinkedItemBag ESB", () => {
    describe("When publishing", () => {
        const mockPublishData = {
            id: "1",
            optionNumber: "2",
            linkedItemId: "3",
            linkedItemOption: "4",
        }

        beforeAll(() => {
            const getBackEsb = new AddLinkedItem()
            getBackEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("SHOPPING_BAG_ADD_LINKED_ITEM", mockPublishData)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const getBackEsb = new AddLinkedItem()
            getBackEsb.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("SHOPPING_BAG_ADD_LINKED_ITEM", mockCallback)
        })
    })
})

describe("Given a AddLinkedItemCallback ESB", () => {
    describe("When publishing", () => {
        const mockPublishData = {
            success: true,
            data: {},
            status: 123,
            textStatus: "test",
        }

        beforeAll(() => {
            const getBagCallbackEsb = new AddLinkedItemCallback()
            getBagCallbackEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("SHOPPING_BAG_ADD_LINKED_ITEM_CALLBACK", mockPublishData)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const getBagCallbackEsb = new AddLinkedItemCallback()
            getBagCallbackEsb.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("SHOPPING_BAG_ADD_LINKED_ITEM_CALLBACK", mockCallback)
        })
    })
})
