import {mapStateToProps, mergeProps} from "./connect"
import {mockState} from "../../../__mocks__/mockStore"
import {pathToVipSite, updateReadOnMainSite} from "../../utils/amidoSaleBagWarning"

jest.mock("../../utils/amidoSaleBagWarning", () => ({
    getReadOnMainSite: () => true,
    pathToVipSite: jest.fn(),
    updateReadOnMainSite: jest.fn(),
}))

describe("Components/SaleBagWarningModal - Given connect - mapStateToProps()", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    describe("setting read on main site as true and return the states", () => {
        const expected = {
            openModal: true,
            siteUrl: mockState.request.siteUrl,
            text: mockState.text.saleBagWarning,
            vipSitePath: pathToVipSite(mockState.request.siteUrl),
        }
        it("should return suggestions, term from the mockState", () => {
            expect(mapStateToProps(mockState)).toEqual(expected)
        })
    })
})

const mockDispatch = jest.fn()
const mockMappedState = {testState: {}}
const ownProps = {testProps: {}}
describe("Components/SaleBagWarningModal - Given connect - mergeProps()", () => {
    let actualMergeProps
    beforeEach(() => {
        actualMergeProps = mergeProps(mockMappedState, {dispatch: mockDispatch} as any, ownProps)
    })
    it("should add state functions", () => {
        expect(actualMergeProps).toEqual({
            ...mockMappedState,
            ...ownProps,
            remainOnMainSiteAction: expect.any(Function),
        })
    })
    it("should create a updateReadOnMainSite function", () => {
        actualMergeProps.remainOnMainSiteAction()
        expect(updateReadOnMainSite).toHaveBeenCalledWith()
    })
})
