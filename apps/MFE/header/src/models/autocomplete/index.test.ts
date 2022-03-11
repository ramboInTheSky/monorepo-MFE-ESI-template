import {
    SuggestionItem,
    ProductItem,
    AutoCompleteParameters,
    AutoCompleteStateModel,
    AutoCompleteInitial,
    AutoCompleteProducts,
} from "."

describe("Model - Autocomplete: ", () => {
    it("should match the SuggestionItem", () => {
        expect(new SuggestionItem()).toMatchSnapshot()
    })
    it("should match the ProductItem", () => {
        expect(new ProductItem()).toMatchSnapshot()
    })
    it("should match the AutoCompleteParameters", () => {
        expect(new AutoCompleteParameters()).toMatchSnapshot()
    })
    it("should match the AutoCompleteStateModel", () => {
        expect(new AutoCompleteStateModel()).toMatchSnapshot()
    })
    it("should match the AutoCompleteInitial", () => {
        expect(new AutoCompleteInitial()).toMatchSnapshot()
    })
    it("should match the AutoCompleteProducts", () => {
        expect(new AutoCompleteProducts()).toMatchSnapshot()
    })
})
