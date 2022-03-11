import {formatCdnPathWithVariant} from "../../utils/getCdnUrl"
import {mockState, mockText} from "../../../__mocks__/mockStore"
import {ElementModel} from "../../models/headerModel"
import {mapStateToProps, mergeProps} from "./connect"
import urls from "../../config/urls"
import {updateUserStatus} from "../../ducks/user"

const filter = (accountState: string): ElementModel => {
    return mockState.data?.regions
        ?.filter(region => region.type === "QuickLinks")[0]
        ?.elements?.filter(link => link.type === "MyAccount")[0]
        ?.elements?.filter(link => link.type === accountState)[0] as ElementModel
}

describe("Components/MyAccount - Given connect - mapStateToProps()", () => {
    it("should return empty string for username if userUpdated is false", () => {
        const result = filter("MyAccountLoggedOut")
        const userUpdatedFalseMockState = {...mockState, user: {firstName: "", loggedIn: false, userUpdated: false}}
        const realm = mockState.data?.realm as string
        const {variant} = mockState.settings
        const expected = {
            accessibilityText: result.accessibilityText as string,
            isLoggedIn: mockState.user.loggedIn,
            narrowModeIcon: formatCdnPathWithVariant(result.narrowModeIcon as string, realm, variant),
            signoutUrl: "fakeamido.com/forget-me",
            tooltipIcon: urls.myAccount.tooltipIconUrl("amido", variant),
            url: "fakeamido.com/secure/accounts/transfer",
            myAccountText: "",
            wideModeIcon: formatCdnPathWithVariant(result.wideModeIcon as string, realm, variant),
            userUpdated: false,
            firstName: userUpdatedFalseMockState.user.firstName,
            text: mockText.myAccount,
        }
        const got = mapStateToProps(userUpdatedFalseMockState)
        expect(got).toEqual(expected)
    })
    it("should return state from the mockState when loggedOut", () => {
        const result = filter("MyAccountLoggedOut")
        const newMockLoggedOut = {...mockState, user: {firstName: "", loggedIn: false, userUpdated: true}}
        const realm = mockState.data?.realm as string
        const {variant} = mockState.settings
        const expected = {
            accessibilityText: result.accessibilityText as string,
            isLoggedIn: mockState.user.loggedIn,
            narrowModeIcon: formatCdnPathWithVariant(result.narrowModeIcon as string, realm, variant),
            signoutUrl: "fakeamido.com/forget-me",
            tooltipIcon: urls.myAccount.tooltipIconUrl("amido", variant),
            url: "fakeamido.com/secure/accounts/transfer",
            myAccountText: "My Account",
            wideModeIcon: formatCdnPathWithVariant(result.wideModeIcon as string, realm, variant),
            userUpdated: true,
            firstName: newMockLoggedOut.user.firstName,
            text: mockText.myAccount,
        }
        const got = mapStateToProps(newMockLoggedOut)
        expect(got).toEqual(expected)
    })
    it("should return state from the mockState when loggedIn", () => {
        const newMock = {...mockState, user: {firstName: "mike", loggedIn: true, userUpdated: true}}
        const result = filter("MyAccountLoggedIn")
        const realm = mockState.data?.realm as string
        const {variant} = mockState.settings
        const expected = {
            accessibilityText: result.accessibilityText as string,
            isLoggedIn: newMock.user.loggedIn,
            narrowModeIcon: formatCdnPathWithVariant(result.narrowModeIcon as string, realm, variant),
            signoutUrl: "fakeamido.com/forget-me",
            tooltipIcon: urls.myAccount.tooltipIconUrl("amido", variant),
            url: "fakeamido.com/secure/accounts/transfer",
            myAccountText: newMock.user.firstName,
            wideModeIcon: formatCdnPathWithVariant(result.wideModeIcon as string, realm, variant),
            firstName: "mike",
            userUpdated: true,
            text: mockText.myAccount,
        }
        const got = mapStateToProps(newMock)
        expect(got).toEqual(expected)
    })
})

const mockDispatch = jest.fn()
const mockMappedState = {testState: {}}
const ownProps = {testProps: {}}
jest.mock("../../ducks/user")

describe("Given connect - mergeProps()", () => {
    let actualMergeProps
    beforeEach(() => {
        actualMergeProps = mergeProps(mockMappedState, {dispatch: mockDispatch} as any, ownProps)
    })
    it("should add state functions", () => {
        expect(actualMergeProps).toEqual({
            ...mockMappedState,
            ...ownProps,
            updateShoppingBag: expect.any(Function),
        })
    })
    it("should create a updateShoppingBag function", () => {
        const mockEventData = {testData: {}}
        actualMergeProps.updateShoppingBag(mockEventData)

        expect(updateUserStatus).toHaveBeenCalledWith(mockEventData)
        expect(mockDispatch).toHaveBeenCalled()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
})
