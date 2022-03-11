import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps, mergeProps} from "./connect"
import {PublishRemoveFromFav, PublishAddToFav} from "../../events"
import {PublishToModalsClosed} from "../../events/modalsClosed"
import {setFavouritedColourways} from "../../ducks/productSummary"
import text from "../../../__mocks__/default-text.json"

jest.mock("../../ducks/productSummary", () => ({
    removeToFav: jest.fn(),
    addToFav: jest.fn(),
    setFavouritedColourways: jest.fn(),
    setLoadingFav: jest.fn(),
    setAnimateFavouriteIcon: jest.fn(),
}))

jest.mock("../../events", () => ({
    PublishRemoveFromFav: jest.fn(() => "PublishRemoveFromFav"),
    PublishAddToFav: jest.fn(() => "PublishAddToFav"),
    PublishToModalsClosed: jest.fn(),
}))
jest.mock("../../events/modalsClosed", () => {
    return {
        PublishToModalsClosed: jest.fn(),
    }
})

let dateNowSpy

describe("Given connect - mapStateToProps()", () => {
    beforeAll(() => {
        jest.clearAllMocks()
    })

    const mappedProps = mapStateToProps(mockState)

    it("should project state and return isFav and itemNumber", () => {
        expect(mappedProps).toEqual({
            isFav: false,
            isLoadingFav: false,
            itemNumber: mockState.productSummary.summaryData.id,
            title: mockState.productSummary.summaryData.title,
            showFavErrorToolTip: null,
            baseUrl: "http://test.co.uk",
            colourways: [
                {
                    title: "White",
                    fits: ["Tall"],
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
                    minPrice: "£123",
                    personalisedType: "Test"
                },
                {
                    title: "Black",
                    fits: ["Tall", "Petite"],
                    id: "434296",
                    colour: "Black",
                    url: "g5990s21/845632#845632",
                    selected: false,
                    price: "£99",
                    salePrice: null,
                    wasPrice: null,
                    overallStarRating: 4,
                    colourChipImage: "http://testcdn.co.uk/AltItemSwatch/21x21/434296.jpg",
                    mainImage: "http://testcdn.co.uk/search/224x336/434296.jpg",
                    minPrice: "£99",
                    personalisedType: "Test"
                },
            ],
            enabledSearchDesc: false,
            fit: "tall",
            department: "menswear",
            text,
            animateFavouriteIcon: false,
            selectedColourwayTitle: "White"
        })
    })
})

describe("Given connect - mergeProps()", () => {
    let actualMergeProps

    const ownProps = {
        itemNumber: 123456,
        isFav: false,
    }
    const mockMappedState = {
        itemNumber: 123456,
        title: "test prod",
        isFav: false,
        addToFavourites: expect.any(Function),
        removeFromFavourites: expect.any(Function),
        showFavErrorToolTip: null,        
        setFavouritedColourways: expect.any(Function),
        colourways: [
            {
                title: "White",
                fits: ["Tall"],
                id: "99434296",
                colour: "White",
                url: "g5990s21/845632#845632",
                selected: true,
                price: "£123",
                salePrice: null,
                wasPrice: null,
            },
            {
                title: "Black",
                fits: ["Tall", "Petite"],
                id: "434296",
                colour: "Black",
                url: "g5990s21/845632#845632",
                selected: false,
                price: "£99",
                salePrice: null,
                wasPrice: null,
            },
        ],
    }
    const mockDispatch = jest.fn()
    beforeAll(() => {
        jest.clearAllMocks()
        actualMergeProps = mergeProps(mockMappedState, {dispatch: mockDispatch} as any, ownProps)
        // Lock Time
        dateNowSpy = jest.spyOn(Date, "now").mockImplementation(() => 1487076708000)
    })
    afterAll(() => {
        dateNowSpy.mockRestore()
    })
    beforeEach(() => {
        delete window.NextFavourites
    })
    it("should add state functions", () => {
        expect(actualMergeProps).toEqual({
            ...mockMappedState,
        })
    })

    describe("Given addToFavourites", () => {
        beforeAll(() => {
            jest.clearAllMocks()
        })

        it("should create a addToFavourites function", () => {
            window.NextFavourites = {
                Data: {
                    ShoppingLists: [{ListId: 1234}],
                },
            }
            actualMergeProps.addToFavourites()
            const data = {
                eventId: "1487076708000",
                itemNumber: "99434296",
                listId: 1234,
                optionCode: -1,
            }
            expect(PublishToModalsClosed).toHaveBeenCalled()
            expect(PublishAddToFav).toHaveBeenCalledWith(data)
            expect(mockDispatch).toHaveBeenCalled()
        })
    })

    describe("Given removeFromFavourites", () => {
        beforeAll(() => {
            jest.clearAllMocks()
        })

        it("should create a removeFromFavourites function", () => {
            window.NextFavourites = {
                Data: {
                    ShoppingLists: [{ListId: 1234}],
                },
            }
            actualMergeProps.removeFromFavourites()
            const data = {
                eventId: "1487076708000",
                itemNumber: "99434296",
                listId: 1234,
                optionCode: -1,
            }
            expect(PublishToModalsClosed).toHaveBeenCalled()
            expect(PublishRemoveFromFav).toHaveBeenCalledWith(data)
            expect(mockDispatch).toHaveBeenCalled()
        })
    })

    it("should call setFavouritedColourways function", () => {
        actualMergeProps.setFavouritedColourways(["colourway id 1", "colourway id 2"])

        expect(setFavouritedColourways).toHaveBeenCalledWith(["colourway id 1", "colourway id 2"])
        expect(mockDispatch).toHaveBeenCalled()
    })
})
