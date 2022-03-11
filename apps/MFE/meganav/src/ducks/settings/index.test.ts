import {SettingsModel, setSettings, SET_SETTINGS, settingsReducer} from "."
import {mockState} from "../../../__mocks__/mockStore"

const initialState = new SettingsModel()

describe("reducers: meganav settings", () => {
    describe("When called with SET_SETTINGS", () => {
        it("should update the state", () => {
            expect(
                settingsReducer(initialState, {
                    type: SET_SETTINGS,
                    value: mockState.settings,
                }),
            ).toEqual(mockState.settings)
        })
    })
})

describe("Settings - setSettings()", () => {
    describe("When called", () => {
        it("should return the expected result", () => {
            expect(setSettings(mockState.settings)).toStrictEqual({
                type: SET_SETTINGS,
                value: mockState.settings,
            })
        })
    })
})
