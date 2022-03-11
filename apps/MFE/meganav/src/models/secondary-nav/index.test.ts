import {
    Link,
    Banner,
    Mission,
    MissionItem,
    Category,
    CategoryLink,
    SecondaryNav,
    Tab,
    Column,
    DefaultConfig,
    Icon,
} from "."

describe("Model: SecondaryNav", () => {
    it("should match the SecondaryNav", () => {
        expect(new SecondaryNav()).toMatchSnapshot()
    })
    it("should match the SecondaryNavItem", () => {
        expect(new Tab()).toMatchSnapshot()
    })
    it("should match the Column", () => {
        expect(new Category()).toMatchSnapshot()
    })
    it("should match the CategoryLink", () => {
        expect(new CategoryLink()).toMatchSnapshot()
    })
    it("should match the Banner", () => {
        expect(new Banner()).toMatchSnapshot()
    })
    it("should match the SecondaryNavItems", () => {
        expect(new Column()).toMatchSnapshot()
    })
    it("should match the Item", () => {
        expect(new Link()).toMatchSnapshot()
    })
    it("should match the Mission", () => {
        expect(new Mission()).toMatchSnapshot()
    })
    it("should match the MissionItem", () => {
        expect(new MissionItem()).toMatchSnapshot()
    })
    it("should match the DefaultConfig", () => {
        expect(new DefaultConfig()).toMatchSnapshot()
    })
    it("should match the Icon", () => {
        expect(new Icon()).toMatchSnapshot()
    })
})
