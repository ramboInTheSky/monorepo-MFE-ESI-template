import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps, mergeProps} from "./connect"

describe("Components/SnailTrail - Given connect - mapStateToProps()", () => {
    it("should return SnailTrail from the mockState", () => {
        const got = mapStateToProps(mockState)
        const dir = mockState.textAlignment
        const {activeDepartmentIndex, isInPrimaryNav} = mockState.primarynav
        const expected = {dir, activeDepartmentIndex, isInPrimaryNav} as any
        expected.items = [
            {
                classNames: "hiddenAccordion hiddenDrawer ",
                excludeFrom: ["NarrowView", "WideView"],
                target: "/new-in",
                path: "New In",
                title: "New In",
            },
            {
                classNames: "first-child-drawer hiddenAccordion ",
                excludeFrom: ["NarrowView"],
                target: "/girls",
                path: "Girls",
                title: "Girls",
            },
            {
                classNames: "first-child-accordion hiddenDrawer ",
                excludeFrom: ["WideView"],
                target: "/lingerie-shop",
                path: "Lingerie",
                title: "Lingerie",
            },
            {
                classNames: "",
                excludeFrom: [],
                fontFamily: "Century Gothic",
                fontWeight: "700",
                linkColour: "#008001",
                target: "/women",
                path: "Women",
                title: "Women",
            },
            {
                classNames: "",
                target: "/homeware",
                path: "Home",
                title: "Home",
            },
            {
                classNames: "",
                target: "/boys",
                path: "Boys",
                title: "Boys",
            },
            {
                classNames: "",
                target: "/men",
                path: "Men",
                title: "Men",
            },
            {
                classNames: "",
                target: "/shoes",
                path: "Shoes",
                title: "Shoes",
            },
            {
                classNames: "",
                target: "/beauty",
                path: "Beauty",
                title: "Beauty",
            },
            {
                classNames: "",
                target: "/branded",
                path: "Brands",
                title: "Brands",
            },
            {
                classNames: "",
                target: "/sports",
                path: "Sports",
                title: "Sports",
            },
            {
                classNames: "",
                target: "/gifts-flowers",
                path: "Gifts & Flowers",
                title: "Gifts & Flowers",
            },
            {
                classNames: "last-child-accordion last-child-drawer ",
                target: "/clearance",
                path: "Clearance",
                title: "Clearance",
            },
        ]

        expect(got).toEqual(expected)
    })
})

describe("Components/SnailTrail - Given connect - mapDispatchToProps()", () => {
    it("should return dispatch methods from connect", () => {
        const dispatch = jest.fn()
        const got = mergeProps({}, {dispatch}, {})
        expect(got).toHaveProperty("setActiveItem")
    })
    it("should fire dispatch twice when setActiveItem is called", () => {
        const dispatch = jest.fn()
        const got = mergeProps({}, {dispatch}, {})
        got.setActiveItem(1, "")
        expect(dispatch).toHaveBeenCalledTimes(2)
    })
})
