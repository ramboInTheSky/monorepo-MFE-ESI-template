import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps, mergeProps} from "./connect"
import {updateFavouritesInState} from "../../ducks/favourites"

describe("Components/Favourites - Given connect - mapStateToProps()", () => {
    it("should project state and only return altText, inactive iconUrl, enablefavourites setting and hasFavourites(false)", () => {
        const newMockState = {
            ...mockState,
            request: {
                ...mockState.request,
                headers: {
                    ...mockState.request.headers,
                    "x-monorepo-realm": "amido",
                },
            },
            favourites: {
                hasFavourites: false,
                enableFavourites: mockState.favourites.enableFavourites,
            },
        }
        expect(mapStateToProps(newMockState)).toEqual({
            altText: "Favourites icon",
            enableFavourites: true,
            favouritesUrl: "fakeamido.com/favourites",
            iconUrl: "/static-content/icons/header/amido/default/favourites-inactive.svg",
        })
    })
    it("should project state and only return altText, active iconUrl, enablefavourites setting and hasFavourites(true)", () => {
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
            altText: "Favourites icon",
            enableFavourites: true,
            favouritesUrl: "fakeamido.com/favourites",
            iconUrl: "/static-content/icons/header/amido/default/favourites-active.svg",
        })
    })
})

const mockDispatch = jest.fn()
const mockMappedState = {testState: {}}
const ownProps = {testProps: {}}
jest.mock("../../ducks/favourites")

describe("Given connect - mergeProps()", () => {
    let actualMergeProps
    beforeEach(() => {
        actualMergeProps = mergeProps(mockMappedState, {dispatch: mockDispatch} as any, ownProps)
    })
    it("should add state functions", () => {
        expect(actualMergeProps).toEqual({
            ...mockMappedState,
            ...ownProps,
            updateFavourites: expect.any(Function),
        })
    })
    it("should create a updateFavourites function", () => {
        const mockEventData = {testData: {}}
        actualMergeProps.updateFavourites(mockEventData)

        expect(updateFavouritesInState).toHaveBeenCalledWith(mockEventData)
        expect(mockDispatch).toHaveBeenCalled()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
})
