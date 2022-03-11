import {breakpoints} from "@monorepo/themes"
import {mockState} from "../../../__mocks__/mockStore"
import {mapDispatchToProps, mapStateToProps} from "./connect"

describe("Components/SecondaryNavContent - Given connect - mapDispatchToProps()", () => {
    it("should return setTabIndex function", () => {
        const dispatch = jest.fn()
        const got = mapDispatchToProps(dispatch)
        got.setTabIndex(1)
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(got).toHaveProperty("setTabIndex")
    })
    it("should return setIsInSecondaryMeganavTrue function", () => {
        const dispatch = jest.fn()
        const got = mapDispatchToProps(dispatch)
        got.setIsInSecondaryMeganavTrue()
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(got).toHaveProperty("setIsInSecondaryMeganavTrue")
    })
    it("should return setIsInSecondaryMeganavFalse function", () => {
        const dispatch = jest.fn()
        const got = mapDispatchToProps(dispatch)
        got.setIsInSecondaryMeganavFalse()
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(got).toHaveProperty("setIsInSecondaryMeganavFalse")
    })
})

describe("Components/Catalogue - Given connect - mapStateToProps()", () => {
    it("should return expected data from the mockState for screens smaller than large", () => {
        const win: any = window
        win.innerWidth = breakpoints.values.lg - 1

        const got = mapStateToProps(mockState, {showAsDrawer: false})
        expect(got).toEqual({
            activeTabIndex: 0,
            activeDepartmentIndex: -1,
            columns: [
                {
                    items: [
                        {
                            fontFamily: null,
                            fontWeight: "",
                            icon: null,
                            items: [
                                {
                                    fontFamily: null,
                                    fontWeight: "",
                                    linkColour: "",
                                    icon: null,
                                    target: "/shop/gender-newborngirls-gender-newbornunisex-gender-oldergirls-gender-youngergirls/feat-newin",
                                    title: "New In",
                                    type: "link",
                                },
                            ],
                            linkColour: "",
                            title: "",
                            type: "category",
                        },
                    ],
                    title: "Column 1",
                    type: "column",
                },
            ],
            department: "men",
            tab: "girls",
            hasBanner: false,
            hasMissions: false,
            hasTabs: true,
            isInPrimaryNav: false,
            isPending: false,
            missions: null,
            tabIds: ["girls", "exclude wide tab"],
        })
    })

    it("should return expected data from the mockState for large screens", () => {
        const win: any = window
        win.innerWidth = breakpoints.values.lg

        const got = mapStateToProps(mockState, {showAsDrawer: true})
        expect(got).toEqual({
            activeTabIndex: 0,
            activeDepartmentIndex: -1,
            columns: [
                {
                    items: [
                        {
                            fontFamily: null,
                            fontWeight: "",
                            icon: null,
                            items: [
                                {
                                    fontFamily: null,
                                    fontWeight: "",
                                    linkColour: "",
                                    icon: null,
                                    target: "/shop/gender-newborngirls-gender-newbornunisex-gender-oldergirls-gender-youngergirls/feat-newin",
                                    title: "New In",
                                    type: "link",
                                },
                            ],
                            linkColour: "",
                            title: "",
                            type: "category",
                        },
                    ],
                    title: "Column 1",
                    type: "column",
                },
            ],
            department: "men",
            tab: "girls",
            hasBanner: false,
            hasMissions: false,
            hasTabs: true,
            isInPrimaryNav: false,
            isPending: false,
            missions: null,
            tabIds: ["girls", "exclude narrow tab"],
        })
    })
})
