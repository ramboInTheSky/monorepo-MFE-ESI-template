import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps, mapDispatchToProps} from "./connect"

const items = [
    {
        target: "/samplew/",
        title: "women",
        path: "women1",
    },
    {
        target: "/samplem/",
        title: "men",
        path: "men1",
    },
]

describe("Components/SecondaryNav - Given connect - mapStateToProps()", () => {
    it("should return SecondaryNav from the mockState", () => {
        const anchor = "left"
        const newState = {
            textAlignment: "rtl",
            primarynav: {
                active: true,
                activeDepartmentIndex: -1,
                items,
                activeDepartment: "",
                isInPrimaryNav: false,
                config: {
                    version: "v1.0.0",
                    country: "gb",
                },
            },
            secondarynav: {
                departmentIds: [],
                catalogues: {"": {} as any},
                isPending: false,
                isInSecondaryNav: false,
                isImagePlaceholderEnabled: false,
                config: {
                    version: "v1.0.0",
                    country: "gb",
                },
            },
        }
        const got = mapStateToProps({...mockState, ...newState})
        const expected = {
            anchor,
            open: true,
            isInPrimaryNav: false,
            isInSecondaryNav: false,
        }
        expect(got).toEqual(expected)
    })
    it("should return expected methods", () => {
        const dispatch = jest.fn()
        const got = mapDispatchToProps(dispatch)
        expect(got).toHaveProperty("deactivateIndex")
    })
    it("should fire dispatch when called", () => {
        const dispatch = jest.fn()
        const got = mapDispatchToProps(dispatch)
        got.deactivateIndex()
        expect(dispatch).toHaveBeenCalledTimes(3)
    })
    it("should flip anchor if active item is last item in array", () => {
        const expected = "right"
        const newState = {
            textAlignment: "rtl",
            primarynav: {
                active: true,
                activeDepartmentIndex: 1,
                items,
                activeDepartment: "",
                isInPrimaryNav: false,
                config: {
                    version: "v1.0.0",
                    country: "gb",
                },
            },
            secondarynav: {
                departmentIds: [],
                catalogues: {"": {} as any},
                isPending: false,
                isInSecondaryNav: false,
                isImagePlaceholderEnabled: false,
                config: {
                    version: "v1.0.0",
                    country: "gb",
                },
            },
        }
        const got = mapStateToProps({...mockState, ...newState})
        expect(got.anchor).toEqual(expected)
    })
})
