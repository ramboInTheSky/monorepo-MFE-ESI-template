import reducer, {SET_USER, updateUserStatus} from "."

const mockStoreDispatch = jest.fn()

const initialState = {firstName: "", loggedIn: false, userUpdated: false}
const mockUser = "Clark Kent"

describe("reducers: user", () => {
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(undefined, {
                    type: "TEST" as any,
                    user: {firstName: "", loggedIn: false, userUpdated: false},
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
                    user: {firstName: "", loggedIn: false, userUpdated: false},
                }),
            ).toEqual({
                ...initialState,
            })
        })
    })

    describe("When called with SET_USER", () => {
        const expectedState = {firstName: mockUser, loggedIn: true, userUpdated: true}
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_USER,
                    user: {firstName: mockUser, loggedIn: true, userUpdated: true},
                }),
            ).toEqual({
                ...expectedState,
            })
        })
    })
})

describe("Store: Helpers: updateUserStatus() - ", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    describe("When data is successful", () => {
        it("should set the redux store as logged in", () => {
            updateUserStatus({success: true, data: {ShoppingBag: {FirstName: "testaccouant"}}} as any)(
                mockStoreDispatch,
            )
            expect(mockStoreDispatch).toHaveBeenCalled()
            expect(mockStoreDispatch).toHaveBeenCalledWith({
                type: SET_USER,
                user: {firstName: "testaccouant", loggedIn: true, userUpdated: true},
            })
        })
    })
    describe("When data is successful but user is not logged in", () => {
        it("should set the redux store as logged in", () => {
            updateUserStatus({success: true, data: {ShoppingBag: {FirstName: null}}} as any)(mockStoreDispatch)
            expect(mockStoreDispatch).toHaveBeenCalled()
            expect(mockStoreDispatch).toHaveBeenCalledWith({
                type: SET_USER,
                user: {firstName: "", loggedIn: false, userUpdated: true},
            })
        })
    })
    describe("When data is not successful", () => {
        it("should set the redux store as logged in", () => {
            updateUserStatus({success: false, data: {ShoppingBag: {FirstName: "testaccouant"}}} as any)(
                mockStoreDispatch,
            )
            expect(mockStoreDispatch).toHaveBeenCalled()
            expect(mockStoreDispatch).toHaveBeenCalledWith({
                type: SET_USER,
                user: {firstName: "", loggedIn: false, userUpdated: true},
            })
        })
    })
})
