import {getStore, getProps, getNextItemNumber} from "./utils"
import {mockState} from "../../__mocks__/mockStore"

const mockPid = "1234"
describe("Client App Utils", () => {
    beforeEach(() => {
        ;(window as any).ssrClientSettings = {
            productSummary: {"1234": {_STATE_: mockState, appProps: {name: "clark", surname: "kent"}}},
        }
    })

    describe("getStore", () => {
        it("should retrieve the store from the window object when no argument is passed", () => {
            const store = getStore(mockPid)
            expect(store).toMatchSnapshot()
            expect((window as any).ssrClientSettings.productSummary).not.toHaveProperty("_STATE_")
        })
        it("should return the store when a state object is passed", () => {
            const store = getStore(mockPid, mockState)
            expect(store).toMatchSnapshot()
        })
    })
    describe("getProps", () => {
        it("should return the app props", () => {
            const props = getProps(mockPid)
            expect(props).toMatchSnapshot()
            expect((window as any).ssrClientSettings.productSummary).not.toHaveProperty("appProps")
        })
    })

    describe("getNextItemNumber", () => {
        describe("When there is no product summary data", () => {
            ;(window as any).ssrClientSettings = {}
            it("should return null", () => {
                expect(getNextItemNumber()).toEqual(null)
            })
        })

        describe("When there is product summary data", () => {
            beforeEach(() => {
                ;(window as any).ssrClientSettings = {
                    productSummary: {
                        itemNumbers: ["testItemNumber"],
                    },
                }
            })

            it("should return the correct value", () => {
                expect(getNextItemNumber()).toEqual("testItemNumber")
            })
        })
    })
})
