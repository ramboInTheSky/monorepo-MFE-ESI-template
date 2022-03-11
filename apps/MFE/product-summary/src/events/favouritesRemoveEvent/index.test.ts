/* eslint-disable @typescript-eslint/unbound-method */
import {RemoveFavouritesCallback, RemoveFavourites} from "@monorepo/eventservice"
import {PublishRemoveFromFav} from "."

jest.mock("@monorepo/eventservice")

describe("Given a Favourites Remove Event", () => {
    describe("call RemoveFavouritesCallback", () => {
        const data = {
            success: true,
            data: {
                ShoppingListItems: [{ItemNumber: "1234"}],
            },
            status: 1,
            textStatus: "",
            eventId: "1234",
        }

        afterEach(() => {
            jest.resetAllMocks()
        })
        it("should call removeFavCallback UnsubscribeAll and dispatch updateFavouritesInState when eventId are the same", () => {
            const mockDispatch = jest.fn()

            ;(RemoveFavouritesCallback.prototype.subscribe as any).mockImplementationOnce(cb => {
                cb({
                    eventId: "1234",
                })
            })

            PublishRemoveFromFav(data)(mockDispatch)
            expect(RemoveFavouritesCallback.prototype.subscribe).toHaveBeenCalledWith(expect.any(Function))
            expect(RemoveFavourites.prototype.publish).toHaveBeenCalled()
            expect(RemoveFavourites.prototype.publish).toHaveBeenCalledWith({
                data: {ShoppingListItems: [{ItemNumber: "1234"}]},
                eventId: "1234",
                status: 1,
                success: true,
                textStatus: "",
            })

            expect(mockDispatch).toHaveBeenCalled()

            expect(RemoveFavouritesCallback.prototype.UnsubscribeAll).toHaveBeenCalled()
        })
        it("should not call removeFavCallback UnsubscribeAll and dispatch  updateFavouritesInState when eventId are the different", () => {
            const mockDispatch = jest.fn()

            ;(RemoveFavouritesCallback.prototype.subscribe as any).mockImplementationOnce(cb => {
                cb({
                    eventId: "85923",
                })
            })

            PublishRemoveFromFav(data)(mockDispatch)
            expect(RemoveFavouritesCallback.prototype.subscribe).toHaveBeenCalledWith(expect.any(Function))
            expect(RemoveFavourites.prototype.publish).toHaveBeenCalled()
            expect(RemoveFavourites.prototype.publish).toHaveBeenCalledWith({
                data: {ShoppingListItems: [{ItemNumber: "1234"}]},
                eventId: "1234",
                status: 1,
                success: true,
                textStatus: "",
            })

            expect(mockDispatch).not.toHaveBeenCalled()

            expect(RemoveFavouritesCallback.prototype.UnsubscribeAll).not.toHaveBeenCalled()
        })
    })
    it("should call SubscribeToFav", () => {
        const data = {
            success: true,
            data: {
                ShoppingListItems: [{ItemNumber: "1234"}],
            },
            status: 1,
            textStatus: "",
            eventId: "",
        }
        const mockDispatch = jest.fn()
        PublishRemoveFromFav(data)(mockDispatch)
        expect(RemoveFavouritesCallback.prototype.subscribe).toHaveBeenCalledWith(expect.any(Function))
        expect(RemoveFavourites.prototype.publish).toHaveBeenCalled()
        expect(RemoveFavourites.prototype.publish).toHaveBeenCalledWith({
            data: {ShoppingListItems: [{ItemNumber: "1234"}]},
            eventId: "",
            status: 1,
            success: true,
            textStatus: "",
        })
    })
})
