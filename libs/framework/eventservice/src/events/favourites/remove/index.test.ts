/* eslint-disable @typescript-eslint/unbound-method */
import {RemoveFavourites, RemoveFavouritesCallback} from "."
import Emitter from "../../../eventEmitter"

jest.mock("../../../eventEmitter", () => ({
    emit: jest.fn(),
    listen: jest.fn(),
}))

describe("Given a RemoveFavourites ESB", () => {
    describe("When publishing", () => {
        const mockPublishData = {
            itemNumber: 5,
            optionCode: "",
            itemUrl: "",
            linkedItemNumber: "",
            linkedOptionNo: "",
            listId: 1,
            eventId: "",
        }

        beforeAll(() => {
            const getBackEsb = new RemoveFavourites()
            getBackEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("FAVOURITES_REMOVE", mockPublishData)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const getBackEsb = new RemoveFavourites()
            getBackEsb.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("FAVOURITES_REMOVE", mockCallback)
        })
    })
})

describe("Given a RemoveFavouritesCallback ESB", () => {
    describe("When publishing", () => {
        const mockPublishData = {
            success: true,
            data: {},
            status: 123,
            textStatus: "",
            eventId: "",
        }

        beforeAll(() => {
            const RemoveFavouritesCallbackEsb = new RemoveFavouritesCallback()
            RemoveFavouritesCallbackEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("FAVOURITES_REMOVE_CALLBACK", mockPublishData)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const RemoveFavouritesCallbackEsb = new RemoveFavouritesCallback()
            RemoveFavouritesCallbackEsb.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("FAVOURITES_REMOVE_CALLBACK", mockCallback)
        })
    })
})
