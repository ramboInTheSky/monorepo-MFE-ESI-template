import {AddWarranty} from "@monorepo/eventservice"
import {SubscribeToShoppingBagAddWarranty} from "."
import {ShoppingBagApiPost} from "../../api/shoppingbag"

jest.mock("../../api/shoppingbag")
jest.mock("@monorepo/eventservice")

describe("Given a Shoppingbag Add Linked Item Event", () => {
    it("should GetBag - AddWarranty", () => {
        SubscribeToShoppingBagAddWarranty("www.test.com")
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(AddWarranty.prototype.subscribe).toHaveBeenCalledWith(expect.any(Function))
    })
})

describe("Given a SubscribeToShoppingBagAddWarranty", () => {
    describe("When event fires", () => {
        beforeAll(() => {
            ;(AddWarranty.prototype.subscribe as any).mockImplementationOnce(cb => {
                cb({})
            })
            SubscribeToShoppingBagAddWarranty("www.test.com")
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call ShoppingBagApiPost ", () => {
            expect(ShoppingBagApiPost).toHaveBeenCalled()
        })
    })
})
