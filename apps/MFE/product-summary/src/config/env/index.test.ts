import env from "."

describe("ENV: ", () => {
    it("should match the SettingsSdkKeys", () => {
        expect(env).toMatchSnapshot()
    })
})
