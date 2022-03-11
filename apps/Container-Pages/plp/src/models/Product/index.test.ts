import {Product, ProductItem} from "."

describe("Model - Product: ", () => {
    it("should match the Product", () => {
        expect(new Product()).toMatchSnapshot()
    })
})
describe("Model - ProductItem: ", () => {
    it("should match the ProductItem", () => {
        expect(new ProductItem()).toMatchSnapshot()
    })
})
