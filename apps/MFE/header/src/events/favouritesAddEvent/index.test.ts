/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable prefer-promise-reject-errors */
import {AddFavourites} from "@monorepo/eventservice"
import {SubscribeToFavouritesAdd} from "."
import {FavouritesApiPost} from "../../api/favourites"

jest.mock("@monorepo/eventservice")
jest.mock("../../api/favourites")
jest.mock("../../utils/favourites")

describe("Given a Favourites Add Event", () => {
    it("should AddFavourites", () => {
        SubscribeToFavouritesAdd("www.test.com")
        expect(AddFavourites.prototype.subscribe).toHaveBeenCalledWith(expect.any(Function))
    })
})

describe("Given a SubscribeToFavouritesAdd", () => {
    describe("When event fires", () => {
        beforeAll(() => {
            ;(AddFavourites.prototype.subscribe as any).mockImplementationOnce(cb => {
                cb({})
            })
            SubscribeToFavouritesAdd("www.test.com")
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call FavouritesApiPost ", () => {
            expect(FavouritesApiPost).toHaveBeenCalled()
        })
    })
})
