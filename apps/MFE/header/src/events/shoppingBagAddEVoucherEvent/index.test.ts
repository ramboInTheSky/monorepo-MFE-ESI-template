/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable prefer-promise-reject-errors */
import {AddEVoucher} from "@monorepo/eventservice"
import {SubscribeToShoppingBagAddEVoucher} from "."
import {ShoppingBagApiPost} from "../../api/shoppingbag"

jest.mock("../../api/shoppingbag")
jest.mock("@monorepo/eventservice")

describe("Given a Shoppingbag Add CIST Event", () => {
    it("should GetBag - AddEVoucher", () => {
        SubscribeToShoppingBagAddEVoucher("www.test.com")
        expect(AddEVoucher.prototype.subscribe).toHaveBeenCalledWith(expect.any(Function))
    })
})

describe("Given a SubscribeToShoppingBagAddEVoucher", () => {
    describe("When event fires", () => {
        beforeAll(() => {
            ;(AddEVoucher.prototype.subscribe as any).mockImplementationOnce(cb => {
                cb({})
            })
            SubscribeToShoppingBagAddEVoucher("www.test.com")
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call ShoppingBagApiPost ", () => {
            expect(ShoppingBagApiPost).toHaveBeenCalled()
        })
    })
})
