import {rootReducer, makeStore} from "."
import {mockState} from "../../__mocks__/mockStore"
import {SET_TEXT_ALIGNMENT} from "./text-alignment"

jest.mock("./text-alignment", () => () => "ltr")
jest.mock("./reviewStars", () => () => ({
    id: "00000",
    baseUrl: "http://test.co.uk",
    overallStarRating: 2.5,
    totalReviewCount: 10,
}))

const expectedInitialState = mockState

describe("combined reducers", () => {
    it("generates the correct state", () => {
        const result = rootReducer(
            {
                textAlignment: mockState.textAlignment,
                reviewStars: mockState.reviewStars,
            },
            {
                type: SET_TEXT_ALIGNMENT,
                textAlignment: "ltr",
            },
        )
        expect(result).toEqual(expectedInitialState)
    })

    describe("Store => makeStore ", () => {
        it("Genereates the store correctly with no errors", () => {
            const store = makeStore(expectedInitialState)
            const initialState = store.getState()
            expect(initialState).toEqual(expectedInitialState)
        })
    })
})
