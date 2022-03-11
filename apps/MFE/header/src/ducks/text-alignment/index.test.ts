import {Store} from "redux"
import Logger from "@monorepo/core-logger"
import reducer, {SET_TEXT_ALIGNMENT, updateTextAlignment} from "."

import {SettingsSdkKeys} from "../../models/settings"

const mockStoreDispatch = jest.fn()
const store = {dispatch: mockStoreDispatch} as unknown as Store

const initialState = ""
const mockTextAlignment = "ltr"

const mockConfiguration = {[SettingsSdkKeys.direction]: {Value: "ltr"}}

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
    info: jest.fn(),
}))

describe("reducers: text alignment", () => {
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(undefined, {
                    type: "test" as any,
                    textAlignment: "",
                }),
            ).toEqual(initialState)
        })
    })

    describe("When called with an action to ignore", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(initialState, {
                    type: "TEST" as any,
                    textAlignment: "",
                }),
            ).toEqual(initialState)
        })
    })

    describe("When called with SET_TEXT_ALIGNMENT", () => {
        const expectedState = "ltr"
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_TEXT_ALIGNMENT,
                    textAlignment: "ltr",
                }),
            ).toEqual(expectedState)
        })
    })
})

describe("Store: Helpers: updateTextAlignment() - ", () => {
    it("should call the dispatch from the configuration", () => {
        updateTextAlignment(store, mockConfiguration)
        expect(mockStoreDispatch).toHaveBeenCalled()
        expect(mockStoreDispatch).toHaveBeenCalledWith({
            type: SET_TEXT_ALIGNMENT,
            textAlignment: mockTextAlignment,
        })
    })
    it("should call the dispatch with the default direction and along with two logger messages", () => {
        updateTextAlignment(store, null)
        expect(mockStoreDispatch).toHaveBeenCalled()
        expect(mockStoreDispatch).toHaveBeenCalledWith({
            type: SET_TEXT_ALIGNMENT,
            textAlignment: "ltr",
        })

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(Logger.error).toHaveBeenCalled()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(Logger.info).toHaveBeenCalled()
    })
})
