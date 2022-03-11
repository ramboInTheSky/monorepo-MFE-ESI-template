/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable prefer-promise-reject-errors */
import {GetBag} from "@monorepo/eventservice"
import {shouldSkipRebuild, SubscribeToShoppingBagGet} from "."
import {ShoppingBagApiGet} from "../../api/shoppingbag"

jest.mock("@monorepo/eventservice")
jest.mock("../../api/shoppingbag")
describe("Given a shouldSkipRebuild", () => {
    it("when guestAccountConverted is true, should return false ", () => {
        expect(shouldSkipRebuild("http://www.test.com/delivery", true)).toEqual(false)
    })

    it("when guestAccountConverted is false and url contains delivery, should return true ", () => {
        expect(shouldSkipRebuild("http://www.test.com/delivery", false)).toEqual(true)
    })

    it("when guestAccountConverted is false and url contains checkout, should return true ", () => {
        expect(shouldSkipRebuild("http://www.test.com/checkout", false)).toEqual(true)
    })

    it("when guestAccountConverted is false and url contains myaccount/addresses, should return true ", () => {
        expect(shouldSkipRebuild("http://www.test.com/myaccount/addresses", false)).toEqual(true)
    })

    it("when guestAccountConverted is false and url contains redirect_navigate, should return true ", () => {
        expect(shouldSkipRebuild("http://www.test.com/redirect_navigate", false)).toEqual(true)
    })

    it("when guestAccountConverted is false and url contains secure/checkout/complete, should return false ", () => {
        expect(shouldSkipRebuild("http://www.test.com/navigate/secure/checkout/complete", false)).toEqual(false)
    })
})

describe("Given a Shoppingbag Add CIST Event", () => {
    it("should GetBag - AddCistBag", () => {
        SubscribeToShoppingBagGet("www.test.com")
        expect(GetBag.prototype.subscribe).toHaveBeenCalledWith(expect.any(Function))
    })
})

describe("Given a SubscribeToShoppingBagGet", () => {
    describe("When event fires", () => {
        beforeAll(() => {
            ;(GetBag.prototype.subscribe as any).mockImplementationOnce(cb => {
                cb({guestAccountConverted: true})
            })
            SubscribeToShoppingBagGet("www.test.com")
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call ShoppingBagApiGet ", () => {
            expect(ShoppingBagApiGet).toHaveBeenCalled()
        })
    })
})
