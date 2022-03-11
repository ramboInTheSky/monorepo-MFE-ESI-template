import {Store} from "redux"
import reducer, {SET_TEXT_ALIGNMENT, updateTextAlignment, selectIsLeftToRight} from "."
import getTextAlignment from "../../utils/getTextAlignment"
import {mockState} from "../../../__mocks__/mockStore"

const mockStoreDispatch = jest.fn()
const store = ({dispatch: mockStoreDispatch} as unknown) as Store

const initialState = ""
const mockTextAlignment = "ltr"

const mockConfiguration = {test: 1234}
jest.mock("../../utils/getTextAlignment", () => ({
    __esModule: true,
    default: jest.fn(() => mockTextAlignment),
}))

describe("reducers: text alignment", () => {
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(undefined, {
                    type: "test" as any,
                    textAlignment: "",
                }),
            ).toEqual(initialState)
        })
    })

    describe("When called with an action to ignore", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(initialState, {
                    type: "TEST" as any,
                    textAlignment: "",
                }),
            ).toEqual(initialState)
        })
    })

    describe("When called with SET_TEXT_ALIGNMENT", () => {
        const expectedState = "ltr"
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_TEXT_ALIGNMENT,
                    textAlignment: "ltr",
                }),
            ).toEqual(expectedState)
        })
    })
})

describe("Store: Helpers: updateTextAlignment() - ", () => {
    describe("When fetching text alignment is successful", () => {
        beforeAll(() => {
            jest.clearAllMocks()
            updateTextAlignment(store, mockConfiguration)
        })

        it("should call getTextAlignment", () => {
            expect(getTextAlignment).toBeCalledWith(mockConfiguration)
        })

        it("should set the redux store as logged in", () => {
            expect(mockStoreDispatch).toHaveBeenCalled()
            expect(mockStoreDispatch).toHaveBeenCalledWith({
                type: SET_TEXT_ALIGNMENT,
                textAlignment: mockTextAlignment,
            })
        })
    })

    describe("When fetching text alignment fails", () => {
        beforeAll(() => {
            jest.clearAllMocks()
            ;(getTextAlignment as jest.Mock).mockImplementation(() => {
                throw new Error("Error")
            })
            updateTextAlignment({...store, dispatch: mockStoreDispatch}, mockConfiguration)
        })

        it("should dispatch an action with a default configuration", () => {
            expect(mockStoreDispatch).toHaveBeenCalledWith({
                type: SET_TEXT_ALIGNMENT,
                textAlignment: "ltr",
            })
        })
    })
})

describe("Store: selectIsLeftToRight()", () => {
    it('should return the correct value', () => {
        expect(selectIsLeftToRight(mockState)).toBe(true)
    })
})
