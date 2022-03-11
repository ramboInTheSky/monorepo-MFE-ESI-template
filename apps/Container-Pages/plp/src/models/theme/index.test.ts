import {mockTheme} from "@monorepo/themes"
import Theme from "."

describe("Model: Theme", () => {
    const mockTestState: Theme = mockTheme
    it("should match the snapshot", () => {
        expect(mockTestState).toMatchSnapshot()
    })
})
