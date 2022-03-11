import {UpdateSize} from "@monorepo/eventservice"
import {SubscribeToShoppingBagUpdateSize} from "."
import {ShoppingBagApiPost} from "../../api/shoppingbag"

jest.mock("../../api/shoppingbag")
jest.mock("@monorepo/eventservice")

describe("Given a Shoppingbag Add Linked Item Event", () => {
    it("should GetBag - UpdateSize", () => {
        SubscribeToShoppingBagUpdateSize("www.test.com")
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(UpdateSize.prototype.subscribe).toHaveBeenCalledWith(expect.any(Function))
    })
})

describe("Given a SubscribeToShoppingBagUpdateSize", () => {
    describe("When event fires", () => {
        beforeAll(() => {
            ;(UpdateSize.prototype.subscribe as any).mockImplementationOnce(cb => {
                cb({})
            })
            SubscribeToShoppingBagUpdateSize("www.test.com")
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call ShoppingBagApiPost ", () => {
            expect(ShoppingBagApiPost).toHaveBeenCalled()
        })
    })
})
