import {Store} from "redux"
import reducer, {SET_TEXT_ALIGNMENT, updateTextAlignment} from "."
import getTextAlignment from "../../utils/getTextAlignment"
import TextAlignment from "../../models/textAlignment"

const mockStoreDispatch = jest.fn()
const store = ({dispatch: mockStoreDispatch} as unknown) as Store

const initialState = TextAlignment.Ltr
const mockTextAlignment = "ltr"

const mockConfiguration = {test: 1234}
jest.mock("../../utils/getTextAlignment", () => ({
    __esModule: true,
    default: jest.fn(() => mockTextAlignment),
}))

describe("reducers: text alignment", () => {
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(undefined, {
                    type: "test" as any,
                    textAlignment: TextAlignment.Rtl,
                }),
            ).toEqual(initialState)
        })
    })

    describe("When called with an action to ignore", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(initialState, {
                    type: "TEST" as any,
                    textAlignment: TextAlignment.Rtl,
                }),
            ).toEqual(initialState)
        })
    })

    describe("When called with SET_TEXT_ALIGNMENT", () => {
        const expectedState = "rtl"
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_TEXT_ALIGNMENT,
                    textAlignment: TextAlignment.Rtl,
                }),
            ).toEqual(expectedState)
        })
    })
})

describe("Store: Helpers: updateTextAlignment() - ", () => {
    beforeAll(() => {
        jest.clearAllMocks()
        updateTextAlignment(store, mockConfiguration)
    })

    it("should call getTextAlignment", () => {
        expect(getTextAlignment).toBeCalledWith(mockConfiguration)
    })

    it("should set the redux store as logged in", () => {
        expect(mockStoreDispatch).toHaveBeenCalled()
        expect(mockStoreDispatch).toHaveBeenCalledWith({
            type: SET_TEXT_ALIGNMENT,
            textAlignment: mockTextAlignment,
        })
    })
})
