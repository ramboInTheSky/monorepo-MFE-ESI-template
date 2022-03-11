import {getStore, getProps} from "./utils"
import {mockState} from "../../__mocks__/mockStore"

describe("Client App Utils", () => {
    beforeEach(() => {
        ;(window as any).ssrClientSettings = {
            footer: {_STATE_: mockState, appProps: {name: "clark", surname: "kent"}},
        }
    })

    describe("getStore", () => {
        it("should retrieve the store from the window object when no argument is passed", () => {
            const store = getStore()
            expect(store).toMatchSnapshot()
            expect((window as any).ssrClientSettings.footer).not.toHaveProperty("_STATE_")
        })
        it("should return the store when a state object is passed", () => {
            const store = getStore(mockState)
            expect(store).toMatchSnapshot()
        })
    })
    describe("getProps", () => {
        it("should return the app props", () => {
            const props = getProps()
            expect(props).toMatchSnapshot()
            expect((window as any).ssrClientSettings.footer).not.toHaveProperty("appProps")
        })
    })
})
