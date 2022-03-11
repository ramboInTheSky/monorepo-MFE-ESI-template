import {
    CompositionSettingsDuckState,
    compositionSettingsReducer,
    SET_COMPOSITION_SETTINGS,
    setCompositionSettingsAction,
} from "."
import {mockState} from "../../../__mocks__/mockStore"

const initialState = new CompositionSettingsDuckState()

describe("CompositionSettings - reducer", () => {
    describe("When called with SET_COMPOSITION_SETTINGS", () => {
        it("should update the state", () => {
            expect(
                compositionSettingsReducer(initialState, {
                    type: SET_COMPOSITION_SETTINGS,
                    value: mockState.compositionSettings,
                }),
            ).toEqual(mockState.compositionSettings)
        })
    })
})

describe("CompositionSettings - setCompositionSettingsAction", () => {
    describe("When called", () => {
        it("should return the expected result", () => {
            expect(setCompositionSettingsAction(mockState.compositionSettings)).toStrictEqual({
                type: SET_COMPOSITION_SETTINGS,
                value: mockState.compositionSettings,
            })
        })
    })
})
