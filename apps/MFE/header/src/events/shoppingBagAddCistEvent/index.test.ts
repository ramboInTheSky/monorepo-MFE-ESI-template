/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable prefer-promise-reject-errors */
import {AddCistBag} from "@monorepo/eventservice"
import {SubscribeToShoppingBagAddCist} from "."
import {ShoppingBagApiPost} from "../../api/shoppingbag"

jest.mock("../../api/shoppingbag")
jest.mock("@monorepo/eventservice")

describe("Given a Shoppingbag Add CIST Event", () => {
    it("should GetBag - AddCistBag", () => {
        SubscribeToShoppingBagAddCist("www.test.com")
        expect(AddCistBag.prototype.subscribe).toHaveBeenCalledWith(expect.any(Function))
    })
})

describe("Given a SubscribeToShoppingBagAddCist", () => {
    describe("When event fires", () => {
        beforeAll(() => {
            ;(AddCistBag.prototype.subscribe as any).mockImplementationOnce(cb => {
                cb({})
            })
            SubscribeToShoppingBagAddCist("www.test.com")
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call ShoppingBagApiPost ", () => {
            expect(ShoppingBagApiPost).toHaveBeenCalled()
        })
    })
})
