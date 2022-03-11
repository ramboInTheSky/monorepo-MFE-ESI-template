import {Fits} from "../../config/constants"
import {
    formatTooltipTitle,
    formatPdpLink,
    formatTitle,
    formatSuitTitle,
    formatSuitTooltipTitle,
    getToolTipTitleByType,
} from "."

describe("Given a formatTooltipTitle", () => {
    describe("When formatting a tooltip", () => {
        it("should format correctly", () => {
            expect(formatTooltipTitle("TEST 1", "TEST 2", "TEST 3", null)).toEqual("TEST 1 (TEST 2) | TEST 3")
        })

        it("should format correctly for SALE item", () => {
            expect(formatTooltipTitle("TEST 1", "TEST 2", "TEST 3", "TEST SALE")).toEqual("TEST 1 (TEST 2) | TEST SALE")
        })
    })
})

describe("Given a formatPdpLink", () => {
    describe("When formatting a pdp link", () => {
        it("should format correctly", () => {
            expect(formatPdpLink("TEST 1", "TEST 2")).toEqual("test 1/test 2")
        })
    })
})

describe("Given a formatTitle", () => {
    describe("Non english language", () => {
        describe("When data returns fit and title when the department is menswear and isMultipleColourways", () => {
            const props = {
                title: "product_title",
                selectedColourway: {
                    id: "",
                    title: "abc123",
                    url: "",
                    selected: false,
                    fits: [],
                    colour: "",
                    price: "",
                    salePrice: "",
                    wasPrice: "",
                    overallStarRating: 3,
                    colourChipImage: "",
                    mainImage: "",
                    personalisedType: "",
                    minPrice: "",
                },
                department: "menswear",
                isMultipleColourways: true,
                fit: "hello",
                isEnglishLang: false,
            }
            it("should return fit and colourway title", () => {
                const expected = `${props.fit} - ${props.title}`
                expect(formatTitle({...props})).toEqual(expected)
            })
        })
        describe("When data just returns title when department is kids and mulitpleColourways", () => {
            const props = {
                title: "product_title",
                selectedColourway: {
                    id: "",
                    title: "abc123",
                    url: "",
                    selected: false,
                    fits: [],
                    colour: "",
                    price: "",
                    salePrice: "",
                    wasPrice: "",
                    overallStarRating: 3,
                    colourChipImage: "",
                    mainImage: "",
                    personalisedType: "",
                    minPrice: "",
                },
                department: "kids",
                isMultipleColourways: true,
                fit: "",
                isEnglishLang: false,
            }
            it("should return selectedColourway title", () => {
                const expected = `${props.title}`
                expect(formatTitle({...props})).toEqual(expected)
            })
        })
        describe("When it has colour and title when isMultipleColourways is true and department is kids", () => {
            const props = {
                title: "product_title",
                selectedColourway: {
                    id: "",
                    title: "abc123",
                    url: "",
                    selected: false,
                    fits: [],
                    colour: "red",
                    price: "",
                    salePrice: "",
                    wasPrice: "",
                    overallStarRating: 3,
                    colourChipImage: "",
                    mainImage: "",
                    personalisedType: "",
                    minPrice: "",
                },
                department: "kids",
                isMultipleColourways: true,
                fit: "",
                isEnglishLang: false,
            }
            it("should return selectedColourway colour and title", () => {
                const expected = `${props.selectedColourway.colour} - ${props.title}`
                expect(formatTitle({...props})).toEqual(expected)
            })
        })
        describe("When it has colour, fit and title when isMultipleColourways is false and department is menswear", () => {
            const props = {
                title: "product_title",
                selectedColourway: {
                    id: "",
                    title: "abc123",
                    url: "",
                    selected: false,
                    fits: [],
                    colour: "red",
                    price: "",
                    salePrice: "",
                    wasPrice: "",
                    overallStarRating: 3,
                    colourChipImage: "",
                    mainImage: "",
                    personalisedType: "",
                    minPrice: "",
                },
                department: "menswear",
                isMultipleColourways: true,
                fit: "fit-data",
                isEnglishLang: false,
            }
            it("should return selectedColourway colour, fit and title", () => {
                const expected = `${props.selectedColourway.colour} - ${props.fit} - ${props.title}`
                expect(formatTitle({...props})).toEqual(expected)
            })
        })
        describe("When data returns only title when the department is kids and not mulitpleColourways", () => {
            const props = {
                title: "product_title",
                selectedColourway: {
                    id: "",
                    title: "abc123 hello jack",
                    url: "",
                    selected: false,
                    fits: [],
                    colour: "",
                    price: "",
                    salePrice: "",
                    wasPrice: "",
                    overallStarRating: 3,
                    colourChipImage: "",
                    mainImage: "",
                    personalisedType: "",
                    minPrice: "",
                },
                department: "kids",
                isMultipleColourways: false,
                fit: "",
                isEnglishLang: false,
            }
            it("should return selectedColourway title", () => {
                const expected = `${props.title}`
                expect(formatTitle({...props})).toEqual(expected)
            })
        })
        describe("When data returns fit and title when the department is menswear and not mulitpleColourways", () => {
            const props = {
                title: "product_title",
                selectedColourway: {
                    id: "",
                    title: "abc123 hello jack",
                    url: "",
                    selected: false,
                    fits: [],
                    colour: "",
                    price: "",
                    salePrice: "",
                    wasPrice: "",
                    overallStarRating: 3,
                    colourChipImage: "",
                    mainImage: "",
                    personalisedType: "",
                    minPrice: "",
                },
                department: "menswear",
                isMultipleColourways: false,
                fit: "fit-data",
                isEnglishLang: false,
            }
            it("should return fit and title", () => {
                const expected = `${props.fit} - ${props.title}`
                expect(formatTitle({...props})).toEqual(expected)
            })
        })
    })
    describe("english language", () => {
        describe("When data returns fit and title when the department is menswear and isMultipleColourways", () => {
            const props = {
                title: "product_title",
                selectedColourway: {
                    id: "",
                    title: "abc123",
                    url: "",
                    selected: false,
                    fits: [],
                    colour: "",
                    price: "",
                    salePrice: "",
                    wasPrice: "",
                    overallStarRating: 3,
                    colourChipImage: "",
                    mainImage: "",
                    personalisedType: "",
                    minPrice: "",
                },
                department: "menswear",
                isMultipleColourways: true,
                fit: "hello",
                isEnglishLang: true,
            }
            it("should return fit and colourway title", () => {
                const expected = `${props.fit} ${props.title}`
                expect(formatTitle({...props})).toEqual(expected)
            })
        })
        describe("When data just returns title when department is kids and mulitpleColourways", () => {
            const props = {
                title: "product_title",
                selectedColourway: {
                    id: "",
                    title: "abc123",
                    url: "",
                    selected: false,
                    fits: [],
                    colour: "",
                    price: "",
                    salePrice: "",
                    wasPrice: "",
                    overallStarRating: 3,
                    colourChipImage: "",
                    mainImage: "",
                    personalisedType: "",
                    minPrice: "",
                },
                department: "kids",
                isMultipleColourways: true,
                fit: "",
                isEnglishLang: true,
            }
            it("should return selectedColourway title", () => {
                const expected = `${props.title}`
                expect(formatTitle({...props})).toEqual(expected)
            })
        })
        describe("When it has colour and title when isMultipleColourways is true and department is kids", () => {
            const props = {
                title: "product_title",
                selectedColourway: {
                    id: "",
                    title: "abc123",
                    url: "",
                    selected: false,
                    fits: [],
                    colour: "red",
                    price: "",
                    salePrice: "",
                    wasPrice: "",
                    overallStarRating: 3,
                    colourChipImage: "",
                    mainImage: "",
                    personalisedType: "",
                    minPrice: "",
                },
                department: "kids",
                isMultipleColourways: true,
                fit: "",
                isEnglishLang: true,
            }
            it("should return selectedColourway colour and title", () => {
                const expected = `${props.selectedColourway.colour} ${props.title}`
                expect(formatTitle({...props})).toEqual(expected)
            })
        })
        describe("When data returns only title when the department is kids and not mulitpleColourways", () => {
            const props = {
                title: "product_title",
                selectedColourway: {
                    id: "",
                    title: "abc123 hello jack",
                    url: "",
                    selected: false,
                    fits: [],
                    colour: "",
                    price: "",
                    salePrice: "",
                    wasPrice: "",
                    overallStarRating: 3,
                    colourChipImage: "",
                    mainImage: "",
                    personalisedType: "",
                    minPrice: "",
                },
                department: "kids",
                isMultipleColourways: false,
                isEnglishLang: true,
            }
            it("should return selectedColourway title", () => {
                const expected = `${props.title}`
                expect(formatTitle({...props})).toEqual(expected)
            })
        })
        describe("When data returns fit and title when the department is menswear and not mulitpleColourways", () => {
            const props = {
                title: "product_title",
                selectedColourway: {
                    id: "",
                    title: "abc123 hello jack",
                    url: "",
                    selected: false,
                    fits: [],
                    colour: "",
                    price: "",
                    salePrice: "",
                    wasPrice: "",
                    overallStarRating: 3,
                    colourChipImage: "",
                    mainImage: "",
                    personalisedType: "",
                    minPrice: "",
                },
                department: "menswear",
                isMultipleColourways: false,
                fit: "fit-data",
                isEnglishLang: true,
            }
            it("should return fit and title", () => {
                const expected = `${props.fit} ${props.title}`
                expect(formatTitle({...props})).toEqual(expected)
            })
        })
        describe("When it has colour, fit and title when isMultipleColourways is true and department is menswear", () => {
            const props = {
                title: "product_title",
                selectedColourway: {
                    id: "",
                    title: "abc123",
                    url: "",
                    selected: false,
                    fits: [],
                    colour: "red",
                    price: "",
                    salePrice: "",
                    wasPrice: "",
                    overallStarRating: 3,
                    colourChipImage: "",
                    mainImage: "",
                    personalisedType: "",
                    minPrice: "",
                },
                department: "menswear",
                isMultipleColourways: true,
                fit: "fit-data",
                isEnglishLang: true,
            }
            it("should return selectedColourway colour, fit and title", () => {
                const expected = `${props.selectedColourway.colour} ${props.fit} ${props.title}`
                expect(formatTitle({...props})).toEqual(expected)
            })
        })
    })
})

describe("Given a formatSuitTitle", () => {
    const formatSuitTitleParams = {
        defaultTitle: "TEST 1",
        title: "TEST 2: REN",
        fit: null,
        selectedColourway: undefined,
        isEnglishLang: true,
    }
    describe("When formatting a suit title with description", () => {
        it("should format correctly", () => {
            expect(formatSuitTitle(formatSuitTitleParams)).toEqual("TEST 2")
        })
    })

    describe("When formatting a suit title without description", () => {
        it("should format correctly", () => {
            expect(formatSuitTitle({...formatSuitTitleParams, title: undefined})).toEqual("TEST 1")
        })
    })

    describe("When formatting a suit title for NON-English site", () => {
        it("should format correctly without fit and colour data", () => {
            expect(
                formatSuitTitle({
                    ...formatSuitTitleParams,
                    title: "Title",
                    defaultTitle: "Default Title: Desc",
                    isEnglishLang: false,
                }),
            ).toEqual("Default Title")
        })

        it("should format correctly with fit data", () => {
            expect(
                formatSuitTitle({
                    ...formatSuitTitleParams,
                    title: "Title",
                    defaultTitle: "Default Title: Desc",
                    fit: Fits.Tall,
                    isEnglishLang: false,
                }),
            ).toEqual("Tall - Default Title")
        })

        it("should format correctly with colour data", () => {
            expect(
                formatSuitTitle({
                    ...formatSuitTitleParams,
                    title: "Title",
                    defaultTitle: "Default Title: Desc",
                    fit: undefined,
                    selectedColourway: {
                        title: "White",
                        fits: [Fits.Tall],
                        id: "99434296",
                        colour: "White",
                        url: "g5990s21/845632#845632",
                        selected: true,
                        price: "£123",
                        salePrice: null,
                        wasPrice: null,
                        overallStarRating: 0,
                        colourChipImage: "http://testcdn.co.uk/AltItemSwatch/21x21/99434296.jpg",
                        mainImage: "http://testcdn.co.uk/search/224x336/99434296.jpg",
                        personalisedType: "",
                        minPrice: "",
                    },
                    isEnglishLang: false,
                }),
            ).toEqual("White - Default Title")
        })

        it("should format correctly with fit and colour data", () => {
            expect(
                formatSuitTitle({
                    ...formatSuitTitleParams,
                    title: "Title",
                    defaultTitle: "Default Title: Desc",
                    fit: Fits.Tall,
                    selectedColourway: {
                        title: "White",
                        fits: [Fits.Tall],
                        id: "99434296",
                        colour: "White",
                        url: "g5990s21/845632#845632",
                        selected: true,
                        price: "£123",
                        salePrice: null,
                        wasPrice: null,
                        overallStarRating: 0,
                        colourChipImage: "http://testcdn.co.uk/AltItemSwatch/21x21/99434296.jpg",
                        mainImage: "http://testcdn.co.uk/search/224x336/99434296.jpg",
                        personalisedType: "",
                        minPrice: "",
                    },
                    isEnglishLang: false,
                }),
            ).toEqual("White - Tall - Default Title")
        })
    })
})

describe("Given a formatSuitTooltipTitle", () => {
    describe("When formatting a suit tooltip title with description", () => {
        it("should format correctly", () => {
            expect(
                formatSuitTooltipTitle({
                    title: "TEST title",
                    defaultTitle: "TEst default title",
                    colourwayItemNumber: "007",
                    price: "£10",
                    salePrice: null,
                    fit: undefined,
                    selectedColourway: undefined,
                    isEnglishLang: true,
                }),
            ).toEqual("TEST title (007) | £10")
        })

        it("should format correctly for SALE Item", () => {
            expect(
                formatSuitTooltipTitle({
                    title: "TEST title",
                    defaultTitle: "TEst default title",
                    colourwayItemNumber: "007",
                    price: "£10",
                    salePrice: "£5",
                    fit: undefined,
                    selectedColourway: undefined,
                    isEnglishLang: true,
                }),
            ).toEqual("TEST title (007) | £5")
        })
    })
})

describe("Given a getToolTipTitleByType", () => {
    describe("When formatting a suit tooltip title with description", () => {
        it("should format correctly", () => {
            expect(
                getToolTipTitleByType("suit", {
                    title: "TEST title",
                    defaultTitle: "TEst default title",
                    colourwayItemNumber: "007",
                    price: "£10",
                    salePrice: null,
                    fit: undefined,
                    selectedColourway: undefined,
                    isEnglishLang: true,
                }),
            ).toEqual("TEST title (007) | £10")
        })
        it("should format correctly for SALE Item", () => {
            expect(
                getToolTipTitleByType("suit", {
                    title: "TEST title",
                    defaultTitle: "TEst default title",
                    colourwayItemNumber: "007",
                    price: "£10",
                    salePrice: "£6",
                    fit: undefined,
                    selectedColourway: undefined,
                    isEnglishLang: true,
                }),
            ).toEqual("TEST title (007) | £6")
        })
    })

    describe("When formatting a suit tooltip title for Non-English Language", () => {
        it("should format correctly with delimeter for no fit and colourway", () => {
            expect(
                getToolTipTitleByType("suit", {
                    title: "TEST title",
                    defaultTitle: "TEst default title",
                    colourwayItemNumber: "007",
                    price: "£10",
                    salePrice: null,
                    fit: undefined,
                    selectedColourway: undefined,
                    isEnglishLang: false,
                }),
            ).toEqual("TEst default title (007) | £10")
        })
        it("should format correctly with delimeter for no fit and colourway with description", () => {
            expect(
                getToolTipTitleByType("suit", {
                    title: "TEST title",
                    defaultTitle: "TEst default title : desc",
                    colourwayItemNumber: "007",
                    price: "£10",
                    salePrice: null,
                    fit: undefined,
                    selectedColourway: undefined,
                    isEnglishLang: false,
                }),
            ).toEqual("TEst default title  (007) | £10")
        })
        it("should format correctly with delimeter for fit", () => {
            expect(
                getToolTipTitleByType("suit", {
                    title: "TEST title",
                    defaultTitle: "TEst default title",
                    colourwayItemNumber: "007",
                    price: "£10",
                    salePrice: null,
                    fit: [Fits.Tall],
                    selectedColourway: undefined,
                    isEnglishLang: false,
                }),
            ).toEqual("Tall - TEst default title (007) | £10")
        })
        it("should format correctly with delimeter for fit and colourway", () => {
            expect(
                getToolTipTitleByType("suit", {
                    title: "TEST title",
                    defaultTitle: "TEst default title",
                    colourwayItemNumber: "007",
                    price: "£10",
                    salePrice: null,
                    fit: [Fits.Tall],
                    selectedColourway: {
                        title: "White",
                        fits: [Fits.Tall],
                        id: "99434296",
                        colour: "White",
                        url: "g5990s21/845632#845632",
                        selected: true,
                        price: "£123",
                        salePrice: null,
                        wasPrice: null,
                        overallStarRating: 0,
                        colourChipImage: "http://testcdn.co.uk/AltItemSwatch/21x21/99434296.jpg",
                        mainImage: "http://testcdn.co.uk/search/224x336/99434296.jpg",
                    },
                    isEnglishLang: false,
                }),
            ).toEqual("White - Tall - TEst default title (007) | £10")
        })
        it("should format correctly with delimeter for colourway", () => {
            expect(
                getToolTipTitleByType("suit", {
                    title: "TEST title",
                    defaultTitle: "TEst default title",
                    colourwayItemNumber: "007",
                    price: "£10",
                    salePrice: null,
                    fit: undefined,
                    selectedColourway: {
                        title: "White",
                        fits: [Fits.Tall],
                        id: "99434296",
                        colour: "White",
                        url: "g5990s21/845632#845632",
                        selected: true,
                        price: "£123",
                        salePrice: null,
                        wasPrice: null,
                        overallStarRating: 0,
                        colourChipImage: "http://testcdn.co.uk/AltItemSwatch/21x21/99434296.jpg",
                        mainImage: "http://testcdn.co.uk/search/224x336/99434296.jpg",
                    },
                    isEnglishLang: false,
                }),
            ).toEqual("White - TEst default title (007) | £10")
        })
    })

    describe("When formatting a suit tooltip title for English Language", () => {
        it("should format correctly with delimeter for no fit and colourway", () => {
            expect(
                getToolTipTitleByType("suit", {
                    title: "TEST title",
                    defaultTitle: "TEst default title",
                    colourwayItemNumber: "007",
                    price: "£10",
                    salePrice: null,
                    fit: undefined,
                    selectedColourway: undefined,
                    isEnglishLang: true,
                }),
            ).toEqual("TEST title (007) | £10")
        })
        it("should format correctly with delimeter for no fit and colourway with description", () => {
            expect(
                getToolTipTitleByType("suit", {
                    title: "TEST title",
                    defaultTitle: "TEst default title : desc",
                    colourwayItemNumber: "007",
                    price: "£10",
                    salePrice: null,
                    fit: undefined,
                    selectedColourway: undefined,
                    isEnglishLang: true,
                }),
            ).toEqual("TEST title (007) | £10")
        })
        it("should format correctly with delimeter for fit", () => {
            expect(
                getToolTipTitleByType("suit", {
                    title: "TEST title",
                    defaultTitle: "TEst default title",
                    colourwayItemNumber: "007",
                    price: "£10",
                    salePrice: null,
                    fit: [Fits.Tall],
                    selectedColourway: undefined,
                    isEnglishLang: true,
                }),
            ).toEqual("TEST title (007) | £10")
        })
        it("should format correctly with delimeter for fit and colourway", () => {
            expect(
                getToolTipTitleByType("suit", {
                    title: "TEST title",
                    defaultTitle: "TEst default title",
                    colourwayItemNumber: "007",
                    price: "£10",
                    salePrice: null,
                    fit: [Fits.Tall],
                    selectedColourway: {
                        title: "White",
                        fits: [Fits.Tall],
                        id: "99434296",
                        colour: "White",
                        url: "g5990s21/845632#845632",
                        selected: true,
                        price: "£123",
                        salePrice: null,
                        wasPrice: null,
                        overallStarRating: 0,
                        colourChipImage: "http://testcdn.co.uk/AltItemSwatch/21x21/99434296.jpg",
                        mainImage: "http://testcdn.co.uk/search/224x336/99434296.jpg",
                    },
                    isEnglishLang: true,
                }),
            ).toEqual("TEST title (007) | £10")
        })
        it("should format correctly with delimeter for colourway", () => {
            expect(
                getToolTipTitleByType("suit", {
                    title: "TEST title",
                    defaultTitle: "TEst default title",
                    colourwayItemNumber: "007",
                    price: "£10",
                    salePrice: null,
                    fit: undefined,
                    selectedColourway: {
                        title: "White",
                        fits: [Fits.Tall],
                        id: "99434296",
                        colour: "White",
                        url: "g5990s21/845632#845632",
                        selected: true,
                        price: "£123",
                        salePrice: null,
                        wasPrice: null,
                        overallStarRating: 0,
                        colourChipImage: "http://testcdn.co.uk/AltItemSwatch/21x21/99434296.jpg",
                        mainImage: "http://testcdn.co.uk/search/224x336/99434296.jpg",
                    },
                    isEnglishLang: true,
                }),
            ).toEqual("TEST title (007) | £10")
        })
    })

    describe("When formatting a product tooltip title with description", () => {
        it("should format correctly", () => {
            expect(
                getToolTipTitleByType("product", {
                    title: "TEST title",
                    defaultTitle: "TEST default title",
                    colourwayItemNumber: "007",
                    price: "£10",
                    salePrice: null,
                    fit: undefined,
                    selectedColourway: undefined,
                    isEnglishLang: true,
                }),
            ).toEqual("TEST default title (007) | £10")
        })
        it("should format correctly for SALE Item", () => {
            expect(
                getToolTipTitleByType("product", {
                    title: "TEST title",
                    defaultTitle: "TEST default title",
                    colourwayItemNumber: "007",
                    price: "£10",
                    salePrice: "£6",
                    fit: undefined,
                    selectedColourway: undefined,
                    isEnglishLang: true,
                }),
            ).toEqual("TEST default title (007) | £6")
        })
    })

    describe("When formatting an unknown type, tooltip title with description", () => {
        it("should format correctly", () => {
            expect(
                getToolTipTitleByType("" as any, {
                    title: "TEST title",
                    defaultTitle: "TEst default title",
                    colourwayItemNumber: "007",
                    price: "£10",
                    salePrice: null,
                    fit: undefined,
                    selectedColourway: undefined,
                    isEnglishLang: true,
                }),
            ).toEqual("TEst default title (007) | £10")
        })
        it("should format correctly for SALE Item", () => {
            expect(
                getToolTipTitleByType("" as any, {
                    title: "TEST title",
                    defaultTitle: "TEst default title",
                    colourwayItemNumber: "007",
                    price: "£10",
                    salePrice: "£6",
                    fit: undefined,
                    selectedColourway: undefined,
                    isEnglishLang: true,
                }),
            ).toEqual("TEst default title (007) | £6")
        })
    })
})
