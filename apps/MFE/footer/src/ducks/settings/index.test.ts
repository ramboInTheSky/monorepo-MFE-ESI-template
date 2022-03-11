import {setSettings, settingsReducer} from "."

const initalState = {
    variant: "default",
}

describe("Settings Reducer", () => {
    describe("When initially called", () => {
        const testAction: any = {
            type: undefined,
            value: undefined,
        }

        it("should return the initial state", () => {
            expect(settingsReducer(undefined, testAction)).toEqual(initalState)
        })

        it("should return the initial state when the inital state is defined", () => {
            expect(settingsReducer(initalState, testAction)).toEqual(initalState)
        })
    })

    describe("When called with the SET_SETTINGS action", () => {
        it("should update the state", () => {
            const invertedState = {
                variant: "inverted",
            }

            expect(settingsReducer(initalState, setSettings({variant: "inverted"}))).toEqual(invertedState)
        })
    })
})
