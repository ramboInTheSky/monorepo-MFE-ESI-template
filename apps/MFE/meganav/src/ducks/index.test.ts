import {makeStore, State} from "."
import {
    mockPrimarynav,
    mockSecondarynav,
    mockAccordionActivity,
    mockTabsActivity,
    mockText,
    mockCompositionSettings,
} from "../../__mocks__/mockStore"

const expectedInitialState = {
    request: {headers: {}, url: "/", siteUrl: "", timeMachineDate: null},
    primarynav: mockPrimarynav,
    secondarynav: mockSecondarynav,
    accordionActivity: mockAccordionActivity,
    tabsActivity: mockTabsActivity,
    textAlignment: "ltr",
    text: mockText,
    settings: {template: "default"},
    compositionSettings: mockCompositionSettings,
}

describe("combined reducers", () => {
    describe("Store => makeStore ", () => {
        it("Genereates the store correctly with no errors", () => {
            const store = makeStore(expectedInitialState as State)
            const initialState = store.getState()
            expect(initialState).toEqual(expectedInitialState)
        })
    })
})
