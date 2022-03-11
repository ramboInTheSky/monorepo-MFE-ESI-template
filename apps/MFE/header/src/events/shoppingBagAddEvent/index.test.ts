/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable prefer-promise-reject-errors */
import {AddBag} from "@monorepo/eventservice"
import {SubscribeToShoppingBagAdd} from "."
import {ShoppingBagApiPost} from "../../api/shoppingbag"

jest.mock("../../api/shoppingbag")
jest.mock("@monorepo/eventservice")

describe("Given a Shoppingbag Add CIST Event", () => {
    it("should GetBag - AddBag", () => {
        SubscribeToShoppingBagAdd("www.test.com")
        expect(AddBag.prototype.subscribe).toHaveBeenCalledWith(expect.any(Function))
    })
})

describe("Given a SubscribeToShoppingBagAdd", () => {
    describe("When event fires", () => {
        beforeAll(() => {
            ;(AddBag.prototype.subscribe as any).mockImplementationOnce(cb => {
                cb({})
            })
            SubscribeToShoppingBagAdd("www.test.com")
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call ShoppingBagApiPost ", () => {
            expect(ShoppingBagApiPost).toHaveBeenCalled()
        })
    })
})
