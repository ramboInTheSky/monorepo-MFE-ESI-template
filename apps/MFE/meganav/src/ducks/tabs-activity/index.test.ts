import reducer, {initialState, SET_ACTIVE, setActiveTab} from "."

describe("reducers: Tabs", () => {
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(undefined, {
                    type: "test" as any,
                    payload: {},
                }),
            ).toEqual(initialState)
        })
    })

    describe("When called with an action to ignore", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(initialState, {
                    type: "TEST" as any,
                    payload: {},
                }),
            ).toEqual(initialState)
        })
    })

    describe("When called with SET_ACTIVE", () => {
        const expectedState = {...initialState, men: 0}
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_ACTIVE,
                    payload: {men: 0},
                }),
            ).toEqual(expectedState)
        })
    })

    describe("When setActiveTab is called", () => {
        it("Should set active department tab index", () => {
            const mockDispatch = jest.fn()
            const department = "men"
            const mockGetState = () => ({
                primarynav: {activeDepartment: department},
                accordionActivity: {},
            })
            const tabIndex = 0
            const expected = {
                type: SET_ACTIVE,
                payload: {[department]: tabIndex},
            }
            setActiveTab(tabIndex)(mockDispatch, mockGetState)
            expect(mockDispatch).toHaveBeenCalledWith(expected)
        })
    })
})
