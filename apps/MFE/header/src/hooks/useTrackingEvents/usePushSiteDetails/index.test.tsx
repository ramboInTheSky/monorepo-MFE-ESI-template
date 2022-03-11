import React from "react"
import * as ReactRedux from "react-redux"
import {renderHook} from "@testing-library/react-hooks"
import {mockConfigureStore, mockState} from "../../../../__mocks__/mockStore"
import {usePushSiteDetails} from "."
import {handleSiteDetails} from "../../../events/trackingEvent/siteDetails"
import * as featureSwitches from "../../../utils/featureSwitch"

jest.mock("../../../events/trackingEvent/siteDetails", () => ({
    __esModule: true,
    handleSiteDetails: jest.fn(),
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
            siteUrl: "fakeamido.com",
            currencyCode: "EUR",
            fullTerritoryName: "Cape Verde",
            headers: {
                ...mockState.request.headers,
                "x-monorepo-territory": "gb",
                "x-monorepo-language": "en",
            },
        },
    })
    const wrapper = ({children}) => <ReactRedux.Provider store={mockStore}>{children}</ReactRedux.Provider>
    const hook = renderHook(() => usePushSiteDetails(), {wrapper})
    return hook
}

const mockScenarioNoState = () => {
    jest.spyOn(ReactRedux, "useSelector")

    const mockStore = mockConfigureStore({
        siteUrl: undefined,
        currencyCode: undefined,
        fullTerritoryName: undefined,
        headers: {},
    })

    const wrapper = ({children}) => <ReactRedux.Provider store={mockStore}>{children}</ReactRedux.Provider>
    const hook = renderHook(() => usePushSiteDetails(), {wrapper})
    return hook
}

describe("Given a handleSiteDetails() and doGTMDataLayerEvents", () => {
    beforeEach(() => {
        mockDoGTMDataLaterReturnValue(true)
    })
    it("should not trigger 'onPageLoad' event if the state is empty", () => {
        mockScenarioNoState()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(handleSiteDetails).not.toHaveBeenCalled()
    })

    it("should trigger 'onPageLoad' event with the right parameters", () => {
        mockScenario()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(handleSiteDetails).toHaveBeenCalledWith({
            siteUrl: "fakeamido.com",
            fullTerritoryName: "Cape Verde",
            currencyCode: "EUR",
            territory: "gb",
            language: "en",
        })
    })

    it("should not trigger 'onPageLoad' event on re-render", () => {
        jest.clearAllMocks()
        const hook = mockScenario()
        hook.rerender()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(handleSiteDetails).not.toHaveBeenCalledWith()
    })
})

describe("Given a handleSiteDetails() and doGTMDataLayerEvents is false", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockDoGTMDataLaterReturnValue(false)
    })
    it("should not trigger 'onPageLoad' with state ", () => {
        mockScenario()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(handleSiteDetails).not.toHaveBeenCalled()
    })
})
