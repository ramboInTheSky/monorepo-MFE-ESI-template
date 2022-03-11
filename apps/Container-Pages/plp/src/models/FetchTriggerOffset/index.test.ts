import {FetchTriggerOffset} from "."

describe("Model - FetchTriggerOffset: ", () => {
    const mockTestState: FetchTriggerOffset = {
        inPageFiltersEnabled: {
            xs: 4,
            sm: 4,
            md: 4,
            lg: 6,
            xl: 8,
        },
        default: {
            xs: 4,
            sm: 4,
            md: 6,
            lg: 6,
            xl: 8,
        },
    }
    it("should match the FetchTriggerOffset", () => {
        expect(mockTestState).toMatchSnapshot()
    })
})
