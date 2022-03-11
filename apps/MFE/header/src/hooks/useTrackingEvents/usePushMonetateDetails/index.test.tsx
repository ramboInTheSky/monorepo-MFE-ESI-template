import React from "react"
import * as ReactRedux from "react-redux"
import {renderHook} from "@testing-library/react-hooks"
import {mockConfigureStore, mockState} from "../../../../__mocks__/mockStore"
import {usePushMonetateDetails} from "."
import {handleMonetateInfoPageLoad} from "../../../events/trackingEvent/monetateInfo"
import * as featureSwitches from "../../../utils/featureSwitch"

jest.mock("../../../events/trackingEvent/monetateInfo", () => ({
    __esModule: true,
    handleMonetateInfoPageLoad: jest.fn(),
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
            monetateSDK: true,
        },
    })
    const wrapper = ({children}) => <ReactRedux.Provider store={mockStore}>{children}</ReactRedux.Provider>
    const hook = renderHook(() => usePushMonetateDetails(), {wrapper})
    return hook
}

const mockScenarioNoState = () => {
    jest.spyOn(ReactRedux, "useSelector")

    const mockStore = mockConfigureStore({
        monetateSDK: undefined
    })

    const wrapper = ({children}) => <ReactRedux.Provider store={mockStore}>{children}</ReactRedux.Provider>
    const hook = renderHook(() => usePushMonetateDetails(), {wrapper})
    return hook
}

describe("Given a handleMonetateInfoPageLoad()  and doGTMDataLayerEvents", () => {
    beforeEach(() => {
        mockDoGTMDataLaterReturnValue(true)
    })
    it("should not trigger 'onPageLoad' event if the state is empty", () => {
        mockScenarioNoState()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(handleMonetateInfoPageLoad).not.toHaveBeenCalled()
    })

    it("should trigger 'onPageLoad' event with the right parameters", () => {
        mockScenario()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(handleMonetateInfoPageLoad).toHaveBeenCalledWith({
            monetateSDK: true
        })
    })

    it("should not trigger 'onPageLoad' event on re-render", () => {
        jest.clearAllMocks()
        const hook = mockScenario()
        hook.rerender()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(handleMonetateInfoPageLoad).not.toHaveBeenCalledWith()
    })
})

describe("Given a handleMonetateInfoPageLoad() and doGTMDataLayerEvents is false", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockDoGTMDataLaterReturnValue(false)
    })
    it("should not trigger 'onPageLoad' with state ", () => {
        mockScenario()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(handleMonetateInfoPageLoad).not.toHaveBeenCalled()
    })
})