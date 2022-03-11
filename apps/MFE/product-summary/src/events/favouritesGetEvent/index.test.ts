/* eslint-disable @typescript-eslint/unbound-method */
import {GetFavouritesCallback} from "@monorepo/eventservice"
import {getFavourtiesSubscriptionCallBack} from "."

jest.mock("@monorepo/eventservice")

describe("Given a Favourites Get Event", () => {
    describe("Given getFavourtiesSubscriptionCallBack", () => {
        const mockCallback = jest.fn()

        beforeEach(() => {
            ;(GetFavouritesCallback.prototype.subscribe as any).mockImplementationOnce(cb => {
                cb({}, "", jest.fn())
            })
        })

        afterEach(() => {
            jest.resetAllMocks()
        })

        it("should call getFavCallback subscribe successfully", () => {
            getFavourtiesSubscriptionCallBack(mockCallback, jest.fn())

            expect(GetFavouritesCallback.prototype.subscribe).toHaveBeenCalledWith(expect.any(Function))
        })

        it("should call getFavCallback UnsubscribeAll successfully", () => {
            getFavourtiesSubscriptionCallBack(mockCallback, jest.fn())

            expect(GetFavouritesCallback.prototype.UnsubscribeAll).toHaveBeenCalled()
        })
    })
})
