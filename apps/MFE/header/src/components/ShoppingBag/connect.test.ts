import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps, mergeProps} from "./connect"
import {updateBag, addEVoucherToBag} from "../../ducks/shoppingbag"

describe("Components/ShoppingBag - Given connect - mapStateToProps()", () => {
    it("should project state and only return altText, color as #fff, iconUrl when set realm as amido", () => {
        const newMockState = {
            ...mockState,
            request: {
                ...mockState.request,
                headers: {
                    ...mockState.request.headers,
                    "x-monorepo-realm": "amido",
                },
            },
        }
        expect(mapStateToProps(newMockState)).toEqual({
            shoppingBagUrl: "fakeamido.com/shoppingbag",
            altText: "Shopping bag icon",
            iconUrl: "/static-content/icons/header/amido/default/shopping-bag.svg",
            itemCount: mockState.shoppingBag.itemCount,
            isBagLoading: false,
        })
    })
})

const mockDispatch = jest.fn()
const mockMappedState = {testState: {}}
const ownProps = {testProps: {}}
jest.mock("../../ducks/shoppingbag")

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
            addEVoucherToBag: expect.any(Function),
        })
    })
    it("should create a updateShoppingBag function", () => {
        const mockEventData = {testData: {}}
        actualMergeProps.updateShoppingBag(mockEventData)

        expect(updateBag).toHaveBeenCalledWith(mockEventData)
        expect(mockDispatch).toHaveBeenCalled()
    })

    it("should create a addEVoucherToBag function", () => {
        const mockEventData = {testData: {}}
        actualMergeProps.addEVoucherToBag(mockEventData)

        expect(addEVoucherToBag).toHaveBeenCalledWith(mockEventData)
        expect(mockDispatch).toHaveBeenCalled()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
})
