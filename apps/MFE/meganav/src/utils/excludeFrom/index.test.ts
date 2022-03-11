import {excludeFromAccordion, excludeFromDrawer, filterByExcludeFrom, filterColumnsByExcludeFrom} from "."

describe("Given a excludeFromAccordion", () => {
    describe("When narrow", () => {
        it("should return true", () => {
            expect(excludeFromAccordion("NarrowView")).toBe(true)
        })
    })
    describe("When wide", () => {
        it("should return false", () => {
            expect(excludeFromAccordion("WideView")).toBe(false)
        })
    })
})

describe("Given a excludeFromDrawer", () => {
    describe("When narrow", () => {
        it("should return true", () => {
            expect(excludeFromDrawer("NarrowView")).toBe(false)
        })
    })
    describe("When wide", () => {
        it("should return false", () => {
            expect(excludeFromDrawer("WideView")).toBe(true)
        })
    })
})

const narrowExcludedData = {
    excludeFrom: ["NarrowView"],
}
const wideExcludedData = {
    excludeFrom: ["WideView"],
}
describe("Given a filterByExcludeFrom", () => {
    describe("When browsing on a narrow site", () => {
        it("should filter the exclude narrow items", () => {
            expect(filterByExcludeFrom(false)(narrowExcludedData as any)).toBe(false)
        })
        it("should not filter the exclude wide items", () => {
            expect(filterByExcludeFrom(false)(wideExcludedData as any)).toBe(true)
        })
    })

    describe("When browsing on a wide site", () => {
        it("should not filter the exclude narrow items", () => {
            expect(filterByExcludeFrom(true)(narrowExcludedData as any)).toBe(true)
        })
        it("should filter the exclude wide items", () => {
            expect(filterByExcludeFrom(true)(wideExcludedData as any)).toBe(false)
        })
    })
})

const mockData = [
    {
        type: "column",
        items: [
            {
                type: "category",
                items: [
                    {
                        type: "link",
                    },
                    {
                        type: "link wide",
                        excludeFrom: ["WideView"],
                    },
                    {
                        type: "link narrow",
                        excludeFrom: ["NarrowView"],
                    },
                ],
            },
            {
                type: "category - wide",
                excludeFrom: ["WideView"],
                items: [
                    {
                        type: "link",
                    },
                    {
                        type: "link wide",
                        excludeFrom: ["WideView"],
                    },
                    {
                        type: "link narrow",
                        excludeFrom: ["NarrowView"],
                    },
                ],
            },
            {
                type: "category - narrow",
                excludeFrom: ["NarrowView"],
                items: [
                    {
                        type: "link",
                    },
                    {
                        type: "link wide",
                        excludeFrom: ["WideView"],
                    },
                    {
                        type: "link narrow",
                        excludeFrom: ["NarrowView"],
                    },
                ],
            },
        ],
    },
    {
        type: "column - wide",
        excludeFrom: ["WideView"],
        items: [
            {
                type: "category",
                items: [
                    {
                        type: "link",
                    },
                    {
                        type: "link wide",
                        excludeFrom: ["WideView"],
                    },
                    {
                        type: "link narrow",
                        excludeFrom: ["NarrowView"],
                    },
                ],
            },
            {
                type: "category - wide",
                excludeFrom: ["WideView"],
                items: [
                    {
                        type: "link",
                    },
                    {
                        type: "link wide",
                        excludeFrom: ["WideView"],
                    },
                    {
                        type: "link narrow",
                        excludeFrom: ["NarrowView"],
                    },
                ],
            },
            {
                type: "category - narrow",
                excludeFrom: ["NarrowView"],
                items: [
                    {
                        type: "link",
                    },
                    {
                        type: "link wide",
                        excludeFrom: ["WideView"],
                    },
                    {
                        type: "link narrow",
                        excludeFrom: ["NarrowView"],
                    },
                ],
            },
        ],
    },
    {
        type: "column",
        excludeFrom: ["NarrowView"],
        items: [
            {
                type: "category",
                items: [
                    {
                        type: "link",
                    },
                    {
                        type: "link wide",
                        excludeFrom: ["WideView"],
                    },
                    {
                        type: "link narrow",
                        excludeFrom: ["NarrowView"],
                    },
                ],
            },
            {
                type: "category - wide",
                excludeFrom: ["WideView"],
                items: [
                    {
                        type: "link",
                    },
                    {
                        type: "link wide",
                        excludeFrom: ["WideView"],
                    },
                    {
                        type: "link narrow",
                        excludeFrom: ["NarrowView"],
                    },
                ],
            },
            {
                type: "category - narrow",
                excludeFrom: ["NarrowView"],
                items: [
                    {
                        type: "link",
                    },
                    {
                        type: "link wide",
                        excludeFrom: ["WideView"],
                    },
                    {
                        type: "link narrow",
                        excludeFrom: ["NarrowView"],
                    },
                ],
            },
        ],
    },
]

const expectedWideSiteData = [
    {
        type: "column",
        items: [
            {
                type: "category",
                items: [
                    {
                        type: "link",
                    },
                    {
                        type: "link narrow",
                        excludeFrom: ["NarrowView"],
                    },
                ],
            },

            {
                type: "category - narrow",
                excludeFrom: ["NarrowView"],
                items: [
                    {
                        type: "link",
                    },
                    {
                        type: "link narrow",
                        excludeFrom: ["NarrowView"],
                    },
                ],
            },
        ],
    },
    {
        type: "column",
        excludeFrom: ["NarrowView"],
        items: [
            {
                type: "category",
                items: [
                    {
                        type: "link",
                    },

                    {
                        type: "link narrow",
                        excludeFrom: ["NarrowView"],
                    },
                ],
            },

            {
                type: "category - narrow",
                excludeFrom: ["NarrowView"],
                items: [
                    {
                        type: "link",
                    },

                    {
                        type: "link narrow",
                        excludeFrom: ["NarrowView"],
                    },
                ],
            },
        ],
    },
]

const expectedNarrowData = [
    {
        type: "column",
        items: [
            {
                type: "category",
                items: [
                    {
                        type: "link",
                    },
                    {
                        type: "link wide",
                        excludeFrom: ["WideView"],
                    },
                ],
            },
            {
                type: "category - wide",
                excludeFrom: ["WideView"],
                items: [
                    {
                        type: "link",
                    },
                    {
                        type: "link wide",
                        excludeFrom: ["WideView"],
                    },
                ],
            },
        ],
    },
    {
        type: "column - wide",
        excludeFrom: ["WideView"],
        items: [
            {
                type: "category",
                items: [
                    {
                        type: "link",
                    },
                    {
                        type: "link wide",
                        excludeFrom: ["WideView"],
                    },
                ],
            },
            {
                type: "category - wide",
                excludeFrom: ["WideView"],
                items: [
                    {
                        type: "link",
                    },
                    {
                        type: "link wide",
                        excludeFrom: ["WideView"],
                    },
                ],
            },
        ],
    },
]

describe("Given a filterColumnsByExcludeFrom", () => {
    describe("When filtering column data for a wide site", () => {
        it("should return the expected data", () => {
            expect(filterColumnsByExcludeFrom(true, mockData as any)).toEqual(expectedWideSiteData)
        })
    })
    describe("When filtering column data for a narrow site", () => {
        it("should return the expected data", () => {
            expect(filterColumnsByExcludeFrom(false, mockData as any)).toEqual(expectedNarrowData)
        })
    })
})
