import {UpdateQuantity} from "@monorepo/eventservice"
import {SubscribeToShoppingBagUpdateQuantity} from "."
import {ShoppingBagApiPost} from "../../api/shoppingbag"

jest.mock("../../api/shoppingbag")
jest.mock("@monorepo/eventservice")

describe("Given a Shoppingbag Add Linked Item Event", () => {
    it("should GetBag - UpdateQuantity", () => {
        SubscribeToShoppingBagUpdateQuantity("www.test.com")
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(UpdateQuantity.prototype.subscribe).toHaveBeenCalledWith(expect.any(Function))
    })
})

describe("Given a SubscribeToShoppingBagUpdateQuantity", () => {
    describe("When event fires", () => {
        beforeAll(() => {
            ;(UpdateQuantity.prototype.subscribe as any).mockImplementationOnce(cb => {
                cb({})
            })
            SubscribeToShoppingBagUpdateQuantity("www.test.com")
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call ShoppingBagApiPost ", () => {
            expect(ShoppingBagApiPost).toHaveBeenCalled()
        })
    })
})
