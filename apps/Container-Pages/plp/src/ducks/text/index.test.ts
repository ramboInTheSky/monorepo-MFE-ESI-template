// import {Store} from "redux"
import { Store } from "redux"
import reducer, {SET_TEXT, updateText, TextDuckState} from "."
import { TextModel } from "../../models/Text"
import text from "../../../__mocks__/default-text.json"

const mockStoreDispatch = jest.fn(store => {
    if (store.error) 
    {
        throw new Error("ERROR")
    }
    return {}
})
const mockStore = ({dispatch: mockStoreDispatch} as unknown) as Store


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
        const expectedState = text
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_TEXT,
                    data: text,
                }),
            ).toEqual(expectedState)
        })
    })
})

describe("Store: Helpers: updateText() - ", () => {
    it("should call the dispatch", () => {
        updateText(mockStore, text)
        expect(mockStoreDispatch).toHaveBeenCalled()
        expect(mockStoreDispatch).toHaveBeenCalledWith({
            type: SET_TEXT,
            data: text,
        })
    })
})