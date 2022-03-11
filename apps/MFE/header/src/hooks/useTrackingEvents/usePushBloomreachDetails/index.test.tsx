import React from "react"
import * as ReactRedux from "react-redux"
import {renderHook} from "@testing-library/react-hooks"
import {mockConfigureStore, mockState} from "../../../../__mocks__/mockStore"
import {usePushBloomreachDetails} from "."
import {handleBloomreachInfoPageLoad} from "../../../events/trackingEvent/bloomreachInfo"
import * as featureSwitches from "../../../utils/featureSwitch"

jest.mock("../../../events/trackingEvent/bloomreachInfo", () => ({
    __esModule: true,
    handleBloomreachInfoPageLoad: jest.fn(),
}))

function mockDoGTMDataLaterReturnValue(value: boolean) {
    return jest.spyOn(featureSwitches, "doGTMDataLayerEvents").mockReturnValue(value)
}

const mockScenario = () => {
    jest.spyOn(ReactRedux, "useSelector")
    const mockStore = mockConfigureStore({
        ...mockState,
        request: {
            ...mockState.request,
            bloomreachGroupLocation: "southWest",
            bloomreachDomainKey: "city_global",
            headers: {
                ...mockState.request.headers,
                "x-monorepo-territory": "gb",
            },
        },
    })
    const wrapper = ({children}) => <ReactRedux.Provider store={mockStore}>{children}</ReactRedux.Provider>
    const hook = renderHook(() => usePushBloomreachDetails(), {wrapper})
    return hook
}

const mockScenarioNoState = () => {
    jest.spyOn(ReactRedux, "useSelector")

    const mockStore = mockConfigureStore({
        bloomreachGroupLocation: undefined,
        bloomreachDomainKey: undefined,
        headers: {},
    })

    const wrapper = ({children}) => <ReactRedux.Provider store={mockStore}>{children}</ReactRedux.Provider>
    const hook = renderHook(() => usePushBloomreachDetails(), {wrapper})
    return hook
}

describe("Given a handleBloomreachInfoPageLoad() and doGTMDataLayerEvents", () => {
    beforeEach(() => {
        mockDoGTMDataLaterReturnValue(true)
    })
    it("should not trigger 'onPageLoad' event if the state is empty", () => {
        mockScenarioNoState()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(handleBloomreachInfoPageLoad).not.toHaveBeenCalled()
    })

    it("should trigger 'onPageLoad' event with the right parameters", () => {
        mockScenario()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(handleBloomreachInfoPageLoad).toHaveBeenCalledWith({
            bloomreachGroupLocation: "southWest",
            bloomreachDomainKey: "city_global",
            territory: "gb",
        })
    })

    it("should not trigger 'onPageLoad' event on re-render", () => {
        jest.clearAllMocks()
        const hook = mockScenario()
        hook.rerender()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(handleBloomreachInfoPageLoad).not.toHaveBeenCalledWith()
    })
})
describe("Given a handleBloomreachInfoPageLoad() and doGTMDataLayerEvents is false", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockDoGTMDataLaterReturnValue(false)
    })
    it("should not trigger 'onPageLoad' with state ", () => {
        mockScenario()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(handleBloomreachInfoPageLoad).not.toHaveBeenCalled()
    })
})
