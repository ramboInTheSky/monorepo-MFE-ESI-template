import {getConfigurationValue} from "."
import {SettingsSdkKeys} from "../../models/settings"

describe("Get Configuration Value", () => {
    it("should return correct url", () => {
        const configuration = {
            "meganav.frontend.template": {
                Value: "burgerMenu",
            },
        }

        expect(getConfigurationValue(configuration, SettingsSdkKeys.template, "Value")).toEqual("burgerMenu")
    })

    it("should throw error when no configuration", () => {
        const configuration = undefined
        expect(() => getConfigurationValue(configuration, SettingsSdkKeys.template, "Value")).toThrow(
            "Settings Failure",
        )
    })
})
