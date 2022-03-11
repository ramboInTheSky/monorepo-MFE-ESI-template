import {AddProductsToMonetate} from "@monorepo/eventservice"
import publishProductNumbersToMonetate from "."

jest.mock("@monorepo/eventservice")

describe("Given a publishProductNumbersToMonetate event", () => {
    it("should call AddProductsToMonetate", () => {
        const mockItems = ["1", "2", "3"]
        publishProductNumbersToMonetate(mockItems)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(AddProductsToMonetate.prototype.publish).toHaveBeenCalled()
    })
})
