import {AddMultiple} from "@monorepo/eventservice"
import {SubscribeToShoppingBagAddMultiple} from "."
import {ShoppingBagApiPost} from "../../api/shoppingbag"

jest.mock("../../api/shoppingbag")
jest.mock("@monorepo/eventservice")

describe("Given a Shoppingbag Add Warranty Event", () => {
    it("should GetBag - AddMultiple", () => {
        SubscribeToShoppingBagAddMultiple("www.test.com")
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(AddMultiple.prototype.subscribe).toHaveBeenCalledWith(expect.any(Function))
    })
})

describe("Given a SubscribeToShoppingBagAddMultiple", () => {
    describe("When event fires", () => {
        beforeAll(() => {
            ;(AddMultiple.prototype.subscribe as any).mockImplementationOnce(cb => {
                cb({
                    data: "any",
                    pageUrl: "",
                    deliveryWeeks: "",
                    isGrouped: false,
                    groupType: "",
                })
            })
            SubscribeToShoppingBagAddMultiple("www.test.com")
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call ShoppingBagApiPost ", () => {
            expect(ShoppingBagApiPost).toHaveBeenCalled()
        })
    })
})
