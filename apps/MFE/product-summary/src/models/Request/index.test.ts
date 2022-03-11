import {RequestState} from "."

describe("Model - RequestState: ", () => {
    const mockTestState: RequestState = {
        headers: {myHeader: "test", "x-monorepo-language": "en"},
        isEnglishLang: true,
    }
    it("should match the RequestState", () => {
        expect(mockTestState).toMatchSnapshot()
    })
})
