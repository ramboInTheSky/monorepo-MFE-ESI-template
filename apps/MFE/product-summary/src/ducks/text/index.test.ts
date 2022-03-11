import {Store} from "redux"
import reducer, {SET_TEXT, TextDuckState, updateText} from "."
import mockText from "../../../__mocks__/default-text.json"
import mockTextAlt1 from "../../../__mocks__/text-prices-no-now.json"
import {TextModel} from "../../models/Text"

const mockStoreDispatch = jest.fn(store => {
    if (store.error) {
        throw new Error("ERROR")
    }
    return {}
})
const mockStore = {dispatch: mockStoreDispatch} as unknown as Store

const initialState: TextDuckState = {} as TextModel
jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
    info: jest.fn(),
}))

describe("reducers: text", () => {
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(undefined, {
                    type: "SET_TEXT" as any,
                    data: {} as TextModel,
                }),
            ).toEqual(initialState)
        })
    })

    describe("When called with an action to ignore", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(initialState, {
                    type: "TEST" as any,
                    data: {} as TextModel,
                }),
            ).toEqual(initialState)
        })
    })

    describe("When called with SET_TEXT", () => {
        const expectedState = mockText
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_TEXT,
                    data: mockText,
                }),
            ).toEqual(expectedState)
        })
    })
})

describe("Store: Helpers: updateText() - ", () => {
    it("should call the dispatch", () => {
        updateText(mockStore, mockText)
        expect(mockStoreDispatch).toHaveBeenCalled()
        expect(mockStoreDispatch).toHaveBeenCalledWith({
            type: SET_TEXT,
            data: mockText,
        })
    })
    it("throw error when no text is supplied", () => {
        updateText(mockStore, undefined as any)
        expect(mockStoreDispatch).toHaveBeenCalled()
        expect(mockStoreDispatch).toHaveBeenCalledWith({
            type: SET_TEXT,
            data: mockText,
        })
    })
    it("should call the dispatch with default sale text overriden", () => {
        const modifiedMockTest = {
            ...mockTextAlt1,
        }
        updateText(mockStore, modifiedMockTest)
        expect(mockStoreDispatch).toHaveBeenCalled()
        expect(mockStoreDispatch).toHaveBeenCalledWith({
            type: SET_TEXT,
            data: modifiedMockTest,
        })
    })
})
