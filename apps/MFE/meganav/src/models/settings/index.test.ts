 import {SettingsSdkKeys} from "."

 describe("Model - settings: ", () => {
     it("should match the SettingsSdkKeys", () => {
         expect(SettingsSdkKeys).toMatchSnapshot()
     })
 })
