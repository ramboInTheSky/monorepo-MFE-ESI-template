/* eslint-disable @typescript-eslint/unbound-method */
import {GetFavourites, GetFavouritesCallback} from "."
import Emitter from "../../../eventEmitter"

jest.mock("../../../eventEmitter", () => ({
    emit: jest.fn(),
    listen: jest.fn(),
}))

describe("Given a GetFavourites ESB", () => {
    describe("When publishing", () => {
        beforeAll(() => {
            const getFavouritesEsb = new GetFavourites()
            getFavouritesEsb.publish()
        })

        const data = undefined
        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("FAVOURITES_GET", data)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const getFavouritesEsb = new GetFavourites()
            getFavouritesEsb.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("FAVOURITES_GET", mockCallback)
        })
    })
})

describe("Given a GetFavouritesCallback ESB", () => {
    describe("When publishing", () => {
        const mockPublishData = {
            success: true,
            data: {},
            status: 123,
            textStatus: "test",
            eventId: "test"
        }

        beforeAll(() => {
            const getFavouritesCallbackEsb = new GetFavouritesCallback()
            getFavouritesCallbackEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("FAVOURITES_GET_CALLBACK", mockPublishData)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const getFavouritesCallbackEsb = new GetFavouritesCallback()
            getFavouritesCallbackEsb.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("FAVOURITES_GET_CALLBACK", mockCallback)
        })
    })
})
