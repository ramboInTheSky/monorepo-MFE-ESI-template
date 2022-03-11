import {QuickLinksElementsTransformer, quickLinkColumnTotal, maxElements, QuickLinkTypes} from "./utils"

describe("Util: QuickLinks", () => {
    it("should match the snapshot for quickLinkColumnTotal", () => {
        expect(quickLinkColumnTotal).toMatchSnapshot()
    })
    it("should match the snapshot for maxElements", () => {
        expect(maxElements).toMatchSnapshot()
    })
    it("should match the snapshot for QuickLinkTypes", () => {
        expect(QuickLinkTypes).toMatchSnapshot()
    })
})
describe("Given a  QuickLinksElementsTransformer", () => {
    describe("When null is passed in", () => {
        let results
        beforeEach(() => {
            results = QuickLinksElementsTransformer(null)
        })
        it("should return null", () => {
            expect(results).toEqual(null)
        })
    })

    describe("When an empty array is passed in", () => {
        let results
        beforeEach(() => {
            results = QuickLinksElementsTransformer([])
        })
        it("should return an empty array", () => {
            expect(results).toEqual([])
        })
    })

    describe("When an array of quicklinks is passed in", () => {
        let results
        const mockInput = {
            url: "",
            openInNewWindow: false,
            name: "",
            type: "TEST",
            icon: "",
            text: "",
            accessibilityText: "",
            tooltip: "",
            accessibilityTooltip: "",
            description: "",
            accessibilityDescription: "",
        }

        beforeEach(() => {
            results = QuickLinksElementsTransformer([mockInput, mockInput, mockInput])
        })
        it("should return an array of quicklinks", () => {
            expect(results).toEqual([mockInput, mockInput, mockInput])
        })
    })

    describe("When an array of quicklinks with MyAccountTypes is passed in ", () => {
        let results
        const mockInput = {
            url: "",
            openInNewWindow: false,
            name: "",
            type: "TEST",
            icon: "",
            text: "",
            accessibilityText: "",
            tooltip: "",
            accessibilityTooltip: "",
            description: "",
            accessibilityDescription: "",
        }
        const mockMyAccountLoggedInInput = {
            url: "",
            openInNewWindow: false,
            name: "",
            type: "MyAccountLoggedIn",
            icon: "",
            text: "",
            accessibilityText: "",
            tooltip: "",
            accessibilityTooltip: "",
            description: "",
            accessibilityDescription: "",
        }
        const mockMyAccountLoggedOutInput = {
            url: "",
            openInNewWindow: false,
            name: "",
            type: "MyAccountLoggedOut",
            icon: "",
            text: "",
            accessibilityText: "",
            tooltip: "",
            accessibilityTooltip: "",
            description: "",
            accessibilityDescription: "",
        }
        const expectedCombinedMyAccountObject = {
            type: "MyAccount",
            loggedIn: mockMyAccountLoggedInInput,
            loggedOut: mockMyAccountLoggedOutInput,
        }
        describe("When Logged In comes before logged out", () => {
            beforeEach(() => {
                results = QuickLinksElementsTransformer([
                    mockInput,
                    mockMyAccountLoggedInInput,
                    mockMyAccountLoggedOutInput,
                    mockInput,
                ])
            })
            it("should return an array of quicklinks", () => {
                expect(results).toEqual([mockInput, expectedCombinedMyAccountObject, mockInput])
            })
        })
        describe("When Logged Out comes before logged in", () => {
            beforeEach(() => {
                results = QuickLinksElementsTransformer([
                    mockInput,
                    mockMyAccountLoggedOutInput,
                    mockMyAccountLoggedInInput,
                    mockInput,
                ])
            })
            it("should return an array of quicklinks", () => {
                expect(results).toEqual([mockInput, expectedCombinedMyAccountObject, mockInput])
            })
        })
    })
})
