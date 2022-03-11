import {getSettings} from "."
import {SettingsSdkKeys} from "../../models/settings"
import BFFLogger from "../../server/core/BFFLogger"
import {VARIANT_DEFAULT} from "../../config/constants"
import {mockState} from "../../../__mocks__/mockStore"

jest.mock("../../server/core/BFFLogger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

const mockConfiguration = {
    [SettingsSdkKeys.variant]: {Value: VARIANT_DEFAULT},
} as any
describe("Utils: getSettings() - ", () => {
    describe("When configuration is valid", () => {
        it("should transform configuration to a Settings object", () => {
            expect(getSettings(mockConfiguration)).toEqual(mockState.settings)
        })
    })

    describe("Given the configuration is undefined", () => {
        it("should log an error and return an empty object", () => {
            const configuration = undefined as any
            const actual = getSettings(configuration)
            const expected = {}
            expect(actual).toEqual(expected)
            expect(BFFLogger.error).toBeCalled()
        })
    })

    describe("Given the configuration is empty", () => {
        it("should log an error and return an empty object", () => {
            const configuration = [] as any
            const actual = getSettings(configuration)
            const expected = {}
            expect(actual).toEqual(expected)
            expect(BFFLogger.error).toBeCalled()
        })
    })
})
