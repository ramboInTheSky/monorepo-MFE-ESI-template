/* eslint-disable @typescript-eslint/unbound-method */
import {AddBag, AddBagCallback} from "."
import Emitter from "../../../eventEmitter"

jest.mock("../../../eventEmitter", () => ({
    emit: jest.fn(),
    listen: jest.fn(),
}))

describe("Given a AddBag ESB", () => {
    describe("When publishing", () => {
        const mockPublishData = {
            id: "1",
            optionNumber: "2",
            chain: "3",
            quantity: 4,
            modalItemUrl: "5",
            saleClearanceSofaImage: "6",
        }

        beforeAll(() => {
            const getBackEsb = new AddBag()
            getBackEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("SHOPPING_BAG_ADD", mockPublishData)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const getBackEsb = new AddBag()
            getBackEsb.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("SHOPPING_BAG_ADD", mockCallback)
        })
    })
})

describe("Given a AddBagCallback ESB", () => {
    describe("When publishing", () => {
        const mockPublishData = {
            success: true,
            data: {},
            status: 123,
            textStatus: "test",
        }

        beforeAll(() => {
            const getBagCallbackEsb = new AddBagCallback()
            getBagCallbackEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("SHOPPING_BAG_ADD_CALLBACK", mockPublishData)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const getBagCallbackEsb = new AddBagCallback()
            getBagCallbackEsb.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("SHOPPING_BAG_ADD_CALLBACK", mockCallback)
        })
    })
})
