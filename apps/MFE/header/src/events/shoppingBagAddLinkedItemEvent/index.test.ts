import {AddLinkedItem} from "@monorepo/eventservice"
import {SubscribeToShoppingBagAddLinkedItem} from "."
import {ShoppingBagApiPost} from "../../api/shoppingbag"

jest.mock("../../api/shoppingbag")
jest.mock("@monorepo/eventservice")

describe("Given a Shoppingbag Add Linked Item Event", () => {
    it("should GetBag - AddLinkedItem", () => {
        SubscribeToShoppingBagAddLinkedItem("www.test.com")
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(AddLinkedItem.prototype.subscribe).toHaveBeenCalledWith(expect.any(Function))
    })
})

describe("Given a SubscribeToShoppingBagAddLinkedItem", () => {
    describe("When event fires", () => {
        beforeAll(() => {
            ;(AddLinkedItem.prototype.subscribe as any).mockImplementationOnce(cb => {
                cb({})
            })
            SubscribeToShoppingBagAddLinkedItem("www.test.com")
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call ShoppingBagApiPost ", () => {
            expect(ShoppingBagApiPost).toHaveBeenCalled()
        })
    })
})
