import reducer, {initialState, SET_ACTIVE, setActivity} from "."

describe("reducers: Accordion", () => {
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
        const expectedState = {...initialState, boys: false}
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_ACTIVE,
                    payload: {boys: false},
                }),
            ).toEqual(expectedState)
        })
    })
    describe("When setActivity is called", () => {
        it("Should set activity state if not previous activity was set", () => {
            const mockDispatch = jest.fn()
            const department = "men"
            const mockGetState = () => ({
                primarynav: {activeDepartment: department},
                accordionActivity: {},
            })
            const title = "clothing"
            const key = `${department}-${title}`
            const expected = {
                type: SET_ACTIVE,
                payload: {[key]: true},
            }
            setActivity(title)(mockDispatch, mockGetState)
            expect(mockDispatch).toHaveBeenCalledWith(expected)
        })
        it("Should toggle activity state", () => {
            const mockDispatch = jest.fn()
            const department = "men"
            const title = "clothing"
            const key = `${department}-${title}`
            const mockGetState = () => ({
                primarynav: {activeDepartment: department},
                accordionActivity: {[key]: true},
            })
            const expected = {
                type: SET_ACTIVE,
                payload: {[key]: false},
            }
            setActivity(title)(mockDispatch, mockGetState)
            expect(mockDispatch).toHaveBeenCalledWith(expected)
        })
    })
})
