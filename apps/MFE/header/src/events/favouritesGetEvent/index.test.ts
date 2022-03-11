/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable prefer-promise-reject-errors */
import {GetFavourites} from "@monorepo/eventservice"
import Cookies from "js-cookie"
import {SubscribeToFavouritesGet, LoadFavouritesApiData} from "."
import {FavouritesApiGet} from "../../api/favourites"
import {shouldUseSessionStorage, setCacheVersion} from "../../utils/favourites"

const globalAny: any = global

jest.mock("@monorepo/eventservice")
jest.mock("../../api/favourites", () => ({
    FavouritesApiGet: jest.fn(),
}))
jest.mock("../../utils/favourites", () => ({
    setCacheVersion: jest.fn(),
    shouldUseSessionStorage: jest.fn(() => true),
}))

describe("Given a Favourites Get Event", () => {
    it("should GetFavourites", () => {
        SubscribeToFavouritesGet("www.test.com")
        expect(GetFavourites.prototype.subscribe).toHaveBeenCalledWith(expect.any(Function))
    })
})

describe("Given a SubscribeToFavouritesGet", () => {
    describe("When event fires", () => {
        beforeAll(() => {
            ;(GetFavourites.prototype.subscribe as any).mockImplementationOnce(cb => {
                cb()
            })
            SubscribeToFavouritesGet("www.test.com")
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call FavouritesApiGet ", () => {
            expect(FavouritesApiGet).toHaveBeenCalled()
        })
    })
})

describe("Given a LoadFavouritesApiData", () => {
    describe("When event fires", () => {
        beforeAll(() => {
            ;(GetFavourites.prototype.subscribe as any).mockImplementationOnce(cb => {
                cb()
            })

            Cookies.get = jest.fn().mockImplementationOnce(() => "=rpid")
            LoadFavouritesApiData("www.test.com")
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call FavouritesApiGet ", () => {
            expect(FavouritesApiGet).toHaveBeenCalled()
        })
        it("should call Cookies.get ", () => {
            expect(Cookies.get).toHaveBeenCalled()
        })
        it("should call setCacheVersion ", () => {
            expect(setCacheVersion).toHaveBeenCalled()
        })
        it("should call shouldUseSessionStorage ", () => {
            expect(shouldUseSessionStorage).toHaveBeenCalled()
        })
        const oldWindowLocation = window.location
        it("should call cachebuster for my account page", () => {
            globalAny.window = Object.create(window)
            const url = "http://www.test.com/myaccount"
            Object.defineProperty(window, "location", {
                value: {
                    href: url,
                },
                writable: true,
            })
            expect(shouldUseSessionStorage).toHaveBeenCalled()
            expect(FavouritesApiGet).toHaveBeenCalledWith(
                "www.test.com/favourite?id=rpid&_=undefined",
                expect.any(Object),
            )
        })
        afterAll(() => {
            window.location = oldWindowLocation
        })
    })
})
