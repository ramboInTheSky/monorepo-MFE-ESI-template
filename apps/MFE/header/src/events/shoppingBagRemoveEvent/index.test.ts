/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable prefer-promise-reject-errors */
import {RemoveBag} from "@monorepo/eventservice"
import {SubscribeToShoppingBagRemove} from "."
import {ShoppingBagApiPost} from "../../api/shoppingbag"

jest.mock("../../api/shoppingbag")
jest.mock("@monorepo/eventservice")

describe("Given a Shoppingbag Remove CIST Event", () => {
    it("should GetBag - RemoveBag", () => {
        SubscribeToShoppingBagRemove("www.test.com")
        expect(RemoveBag.prototype.subscribe).toHaveBeenCalledWith(expect.any(Function))
    })
})

describe("Given a SubscribeToShoppingBagRemove", () => {
    describe("When event fires", () => {
        beforeAll(() => {
            ;(RemoveBag.prototype.subscribe as any).mockImplementationOnce(cb => {
                cb({})
            })
            SubscribeToShoppingBagRemove("www.test.com")
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call ShoppingBagApiPost ", () => {
            expect(ShoppingBagApiPost).toHaveBeenCalled()
        })
    })
})
