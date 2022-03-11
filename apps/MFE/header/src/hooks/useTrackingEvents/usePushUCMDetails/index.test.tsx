import React from "react"
import * as ReactRedux from "react-redux"
import {renderHook} from "@testing-library/react-hooks"
import {mockConfigureStore, mockState} from "../../../../__mocks__/mockStore"
import {usePushUCMDetails} from "."
import {handleUCMInfoPageLoad} from "../../../events/trackingEvent/ucmInfo"
import * as featureSwitches from "../../../utils/featureSwitch"

jest.mock("../../../events/trackingEvent/ucmInfo", () => ({
    __esModule: true,
    handleUCMInfoPageLoad: jest.fn(),
}))

function mockDoGTMDataLaterReturnValue(value: boolean) {
    return jest.spyOn(featureSwitches, "doGTMDataLayerEvents").mockReturnValue(value)
}

const mockScenario = (ucmOn: boolean) => {
    jest.spyOn(ReactRedux, "useSelector")
    const mockStore = mockConfigureStore({
        ...mockState,
        request: {
            ...mockState.request,
        },
        settings: {
            "userConsentManagement.enabled": ucmOn,
        },
    })
    const wrapper = ({children}) => <ReactRedux.Provider store={mockStore}>{children}</ReactRedux.Provider>
    const hook = renderHook(() => usePushUCMDetails(), {wrapper})
    return hook
}

const mockScenarioNoState = () => {
    jest.spyOn(ReactRedux, "useSelector")

    const mockStore = mockConfigureStore({})

    const wrapper = ({children}) => <ReactRedux.Provider store={mockStore}>{children}</ReactRedux.Provider>
    const hook = renderHook(() => usePushUCMDetails(), {wrapper})
    return hook
}

describe("Given a handleUCMInfoPageLoad() and doGTMDataLayerEvents", () => {
    beforeEach(() => {
        mockDoGTMDataLaterReturnValue(true)
    })
    it("should not trigger 'onPageLoad' event if the state is empty", () => {
        mockScenarioNoState()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(handleUCMInfoPageLoad).not.toHaveBeenCalled()
    })

    it("user consent management on: should trigger 'onPageLoad' event with the right parameters", () => {
        mockScenario(true)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(handleUCMInfoPageLoad).toHaveBeenCalledWith({
            ucmSDK: true,
        })
    })

    it("user consent management off: should not trigger 'onPageLoad' event", () => {
        mockScenario(false)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(handleUCMInfoPageLoad).not.toHaveBeenCalledWith()
    })

    it("should not trigger 'onPageLoad' event on re-render", () => {
        jest.clearAllMocks()
        const hook = mockScenario(true)
        hook.rerender()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(handleUCMInfoPageLoad).not.toHaveBeenCalledWith()
    })
})

describe("Given a handleUCMInfoPageLoad() and doGTMDataLayerEvents is false", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockDoGTMDataLaterReturnValue(false)
    })
    it("should not trigger 'onPageLoad' with state ", () => {
        mockScenario(true)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(handleUCMInfoPageLoad).not.toHaveBeenCalled()
    })
})
