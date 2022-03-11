/* eslint-disable @typescript-eslint/unbound-method */
import {AddFavourites, AddFavouritesCallback} from "."
import Emitter from "../../../eventEmitter"

jest.mock("../../../eventEmitter", () => ({
    emit: jest.fn(),
    listen: jest.fn(),
}))

describe("Given a AddFavourites ESB", () => {
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
            const addFavouritesEsb = new AddFavourites()
            addFavouritesEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("FAVOURITES_ADD", mockPublishData)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const addFavouritesEsb = new AddFavourites()
            addFavouritesEsb.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("FAVOURITES_ADD", mockCallback)
        })
    })
})

describe("Given a AddFavouritesCallback ESB", () => {
    describe("When publishing and receives an error - MaximumLimitExceeded", () => {
        const mockPublishData = {
            success: false,
            errorMessage: "MaximumLimitExceeded",
        }

        beforeAll(() => {
            const addFavouritesCallbackEsb = new AddFavouritesCallback()
            addFavouritesCallbackEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("FAVOURITES_ADD_CALLBACK", mockPublishData)
        })
    })
    describe("When publishing", () => {
        const mockPublishData = {
            success: true,
            data: {},
            status: 123,
            textStatus: "",
            eventId: "",
        }

        beforeAll(() => {
            const addFavouritesCallbackEsb = new AddFavouritesCallback()
            addFavouritesCallbackEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("FAVOURITES_ADD_CALLBACK", mockPublishData)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const addFavouritesCallbackEsb = new AddFavouritesCallback()
            addFavouritesCallbackEsb.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("FAVOURITES_ADD_CALLBACK", mockCallback)
        })
    })
})
