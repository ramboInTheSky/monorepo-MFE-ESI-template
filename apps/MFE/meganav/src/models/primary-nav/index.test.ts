import {PrimaryNav, PrimaryNavItem, DefaultConfig} from "."

describe("Model: PrimaryNav", () => {
    it("should match the PrimaryNav", () => {
        expect(new PrimaryNav()).toMatchSnapshot()
    })
    it("should match the PrimaryNavItem", () => {
        expect(new PrimaryNavItem()).toMatchSnapshot()
    })
    it("should match the DefaultConfig", () => {
        expect(new DefaultConfig()).toMatchSnapshot()
    })
})
