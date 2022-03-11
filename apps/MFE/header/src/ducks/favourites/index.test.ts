import {Store} from "redux"
import reducer, {SET_FAVOURITES, updateFavouritesInState, setFavouritesSettings} from "."

const mockStoreDispatch = jest.fn()
const mockStoreGetState = jest.fn(() => ({
    request: {headers: ""},
    favourites: {enableFavourites: true, hasFavourites: false},
}))
const mockStore = {
    dispatch: mockStoreDispatch,
    getState: mockStoreGetState,
}

const initialState = {enableFavourites: false, hasFavourites: false}
const mockResponse = {
    req: {
        test: "TEST REQUEST",
        headers: {"x-monorepo-siteurl": "Test siteurl"},
    },
    locals: {
        configuration: {
            "header.frontend.enableFavourites": {
                Value: false,
            },
        },
    },
}

describe("reducers: favourites", () => {
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(undefined, {
                    type: "TEST" as any,
                    payload: {enableFavourites: false},
                }),
            ).toEqual({
                ...initialState,
            })
        })
    })

    describe("When called with an action to ignore", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(initialState, {
                    type: "TEST" as any,
                    payload: {enableFavourites: false},
                }),
            ).toEqual({
                ...initialState,
            })
        })
    })

    describe("When called with SET_FAVOURITES", () => {
        const expectedState = {enableFavourites: true, hasFavourites: false}
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_FAVOURITES,
                    payload: {enableFavourites: true},
                }),
            ).toEqual({
                ...expectedState,
            })
        })
    })

    describe("Store: Helpers: setFavouritesSettings() - ", () => {
        beforeEach(() => {
            jest.clearAllMocks()
        })
        describe("When setFavouritesSettings is called", () => {
            it("dispatch should be called with SET_FAVOURITES ", () => {
                setFavouritesSettings(mockStore as unknown as Store, mockResponse.locals.configuration)
                expect(mockStoreDispatch).toHaveBeenCalled()
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: SET_FAVOURITES,
                    payload: {enableFavourites: false},
                })
            })
        })
    })

    describe("Store: Helpers: updateFavouritesInState() - ", () => {
        beforeEach(() => {
            jest.clearAllMocks()
        })
        describe("When updateFavouritesInState is called and hasFavourites is true", () => {
            beforeEach(() => {
                ;(window as any).AmidoFavourites = {
                    Data: {},
                }

                updateFavouritesInState({
                    success: true,
                    data: {ShoppingListItems: [{test: "test"}]},
                    status: 200,
                    textStatus: "test",
                    eventId: "test",
                } as any)(mockStoreDispatch, mockStoreGetState)
            })
            it("shoulddispatch should be called with SET_FAVOURITES ", () => {
                expect(mockStoreDispatch).toHaveBeenCalled()
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: SET_FAVOURITES,
                    payload: {enableFavourites: true, hasFavourites: true},
                })
            })

            it("should match the snapshot of the window.AmidoFavourites.Data", () => {
                expect((window as any).AmidoFavourites.Data).toMatchSnapshot()
            })
        })
        describe("When updateFavouritesInState is called and hasFavourites is false", () => {
            it("dispatch should be called with SET_FAVOURITES ", () => {
                updateFavouritesInState({
                    success: true,
                    data: {ShoppingListItems: []},
                    status: 200,
                    textStatus: "test",
                    eventId: "test",
                } as any)(mockStoreDispatch, mockStoreGetState)
                expect(mockStoreDispatch).toHaveBeenCalled()
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: SET_FAVOURITES,
                    payload: {enableFavourites: true, hasFavourites: false},
                })
            })
        })
        describe("When updateFavouritesInState is called for unsuccessful request", () => {
            it("dispatch should be called with SET_FAVOURITES ", () => {
                updateFavouritesInState({
                    success: false,
                    data: {ShoppingListItems: []},
                    status: 200,
                    textStatus: "test",
                    eventId: "test",
                } as any)(mockStoreDispatch, mockStoreGetState)
                expect(mockStoreDispatch).toHaveBeenCalled()
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: SET_FAVOURITES,
                    payload: {enableFavourites: true, hasFavourites: false},
                })
            })
        })
    })
})
