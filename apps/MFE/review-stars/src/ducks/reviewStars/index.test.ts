import {ReviewStarsData} from "models/reviewStarsApi"
import reducer, {
    SET_REVIEW_STARS_DATA,
    updateReviewStars
} from "."
import {mockState} from "../../../__mocks__/mockStore"

const mockStoreDispatch = jest.fn()

jest.mock("../../api/getReviewStars", () => ({
    getReviewStars: jest.fn(async () => Promise.resolve(mockState.reviewStars)),
}))

const initialState: ReviewStarsData = {
    id: "",
    totalReviewCount: 0,
    overallStarRating: 0,
    baseUrl: ''
}

describe("reducers: review stars", () => {
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(undefined, {
                    type: null as any,
                    data: null as any,
                }),
            ).toEqual({
                ...initialState,
            })
        })
    })

    describe("When called with an action to ignore", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(initialState, {
                    type: null as any,
                    data: null as any,
                }),
            ).toEqual({
                ...initialState,
            })
        })
    })

    describe("When called with SET_REVIEW_STARS_DATA", () => {
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_REVIEW_STARS_DATA,
                    data: mockState.reviewStars,
                }),
            ).toEqual({
                ...mockState.reviewStars,
            })
        })
    })
})

describe("Store: updateReviewStars() ", () => {
    beforeEach(async done => {
        jest.clearAllMocks()
        await updateReviewStars({dispatch: mockStoreDispatch} as any, {
            headers: {},
            itemNumber: "123"
        })
        done()
    })
    describe("When loading products", () => {
        it("should call the store dispatch", () => {
            expect(mockStoreDispatch).toHaveBeenCalled()
            expect(mockStoreDispatch).toHaveBeenCalledWith({
                type: SET_REVIEW_STARS_DATA,
                data: mockState.reviewStars,
            })
        })

        it("should return the search api data", () => {
            expect(mockStoreDispatch).toHaveBeenCalled()
        })
    })
})
