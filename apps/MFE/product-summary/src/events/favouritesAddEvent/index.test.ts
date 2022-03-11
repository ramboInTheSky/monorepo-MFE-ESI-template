/* eslint-disable @typescript-eslint/unbound-method */
import {AddFavouritesCallback, AddFavourites} from "@monorepo/eventservice"
import {PublishAddToFav} from "."

jest.mock("@monorepo/eventservice")

describe("Given a Favourites Add Event", () => {
    describe("call AddFavouritesCallback", () => {
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
        it("should call addFavCallback UnsubscribeAll and dispatch  updateFavouritesInState when eventId are the same", () => {
            const mockDispatch = jest.fn()

            ;(AddFavouritesCallback.prototype.subscribe as any).mockImplementationOnce(cb => {
                cb({
                    eventId: "1234",
                })
            })

            PublishAddToFav(data)(mockDispatch)
            expect(AddFavouritesCallback.prototype.subscribe).toHaveBeenCalledWith(expect.any(Function))
            expect(AddFavourites.prototype.publish).toHaveBeenCalled()
            expect(AddFavourites.prototype.publish).toHaveBeenCalledWith({
                data: {ShoppingListItems: [{ItemNumber: "1234"}]},
                eventId: "1234",
                status: 1,
                success: true,
                textStatus: "",
            })

            expect(mockDispatch).toHaveBeenCalled()

            expect(AddFavouritesCallback.prototype.UnsubscribeAll).toHaveBeenCalled()
        })
        it("should not call addFavCallback UnsubscribeAll and dispatch  updateFavouritesInState when eventId are the different", () => {
            const mockDispatch = jest.fn()

            ;(AddFavouritesCallback.prototype.subscribe as any).mockImplementationOnce(cb => {
                cb({
                    eventId: "85923",
                })
            })

            PublishAddToFav(data)(mockDispatch)
            expect(AddFavouritesCallback.prototype.subscribe).toHaveBeenCalledWith(expect.any(Function))
            expect(AddFavourites.prototype.publish).toHaveBeenCalled()
            expect(AddFavourites.prototype.publish).toHaveBeenCalledWith({
                data: {ShoppingListItems: [{ItemNumber: "1234"}]},
                eventId: "1234",
                status: 1,
                success: true,
                textStatus: "",
            })

            expect(mockDispatch).not.toHaveBeenCalled()

            expect(AddFavouritesCallback.prototype.UnsubscribeAll).not.toHaveBeenCalled()
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
        PublishAddToFav(data)(mockDispatch)
        expect(AddFavouritesCallback.prototype.subscribe).toHaveBeenCalledWith(expect.any(Function))
        expect(AddFavourites.prototype.publish).toHaveBeenCalled()
        expect(AddFavourites.prototype.publish).toHaveBeenCalledWith({
            data: {ShoppingListItems: [{ItemNumber: "1234"}]},
            eventId: "",
            status: 1,
            success: true,
            textStatus: "",
        })
    })
})
