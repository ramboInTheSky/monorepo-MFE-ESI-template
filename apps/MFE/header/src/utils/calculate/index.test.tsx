import calculate from "."
import {Item} from "../../models/shoppingbag"

describe("Utils: Total - ", () => {
    const items = [
        {
            ItemID: 1,
            ItemNumber: "436441",
            OptionNo: "04",
            SizeDescription: "10 S",
            Price: "45.00",
            Quantity: 10,
            StockMessage: "Delayed",
            StockStatus: "delayed",
            Description: "Black Lift, Slim And Shape Skinny Jeans",
        } as Item,
        {
            ItemID: 2,
            ItemNumber: "436642",
            OptionNo: "04",
            SizeDescription: "15 L",
            Price: "45.00",
            Quantity: 5,
            StockMessage: "In Stock",
            StockStatus: "instock",
            Description: "Black Lift, Slim And Shape Skinny Jeans",
        } as Item,
        {
            ItemID: 3,
            ItemNumber: "437742",
            OptionNo: "04",
            SizeDescription: "15 L",
            Price: "45.00",
            Quantity: 7,
            StockMessage: "Sold Out",
            StockStatus: "soldout",
            Description: "Black Lift, Slim And Shape Skinny Jeans",
        } as Item,
    ]

    it("should return initial total", () => {
        expect(calculate.total([])).toBeFalsy()
    })
    it("should return the right total amount", () => {
        expect(calculate.total(items)).toEqual("675.00")
    })
})
