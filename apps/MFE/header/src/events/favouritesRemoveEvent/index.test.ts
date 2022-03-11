/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable prefer-promise-reject-errors */
import {RemoveFavourites} from "@monorepo/eventservice"
import {SubscribeToFavouritesRemove} from "."
import {FavouritesApiPost} from "../../api/favourites"

jest.mock("@monorepo/eventservice")
jest.mock("../../api/favourites")
jest.mock("../../utils/favourites")

describe("Given a Favourites Remove Event", () => {
    it("should RemoveFavourites", () => {
        SubscribeToFavouritesRemove("www.test.com")
        expect(RemoveFavourites.prototype.subscribe).toHaveBeenCalledWith(expect.any(Function))
    })
})

describe("Given a SubscribeToFavouritesRemove", () => {
    describe("When event fires", () => {
        beforeAll(() => {
            ;(RemoveFavourites.prototype.subscribe as any).mockImplementationOnce(cb => {
                cb({})
            })
            SubscribeToFavouritesRemove("www.test.com")
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call FavouritesApiPost ", () => {
            expect(FavouritesApiPost).toHaveBeenCalled()
        })
    })
})
