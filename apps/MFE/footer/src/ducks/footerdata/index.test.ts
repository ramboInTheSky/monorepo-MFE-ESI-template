/* eslint-disable jest/no-mocks-import */
import mockData from "../../../__mocks__/apiFooterData"
import reducer, {SET_FOOTER_DATA, getFooterDataThunk} from "."

const mockStoreDispatch = jest.fn()

const mockStore = {
    dispatch: mockStoreDispatch,
    getState: jest.fn(() => ({request: {headers: ""}})),
}

jest.mock("@app/api/footerdata", () => ({
    getFooterData: jest.fn(async () => Promise.resolve(mockData)),
}))

const initialState = null

const expectedState = mockData
describe("reducers: footerdata", () => {
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(undefined, {
                    type: "TEST" as any,
                    data: null as any,
                }),
            ).toEqual(null)
        })
    })

    describe("When called with an action to ignore", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(initialState, {
                    type: "TEST" as any,
                    data: null as any,
                }),
            ).toEqual(null)
        })
    })

    describe("When called with SET_FOOTER_DATA", () => {
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_FOOTER_DATA,
                    data: mockData as any,
                }),
            ).toEqual(expectedState)
        })
    })
})

describe("Store: getFooterDataThunk() ", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        const _getFooterData = getFooterDataThunk(mockStore as any)
    })
    describe("When loading products", () => {
        it("should call the store dispatch", () => {
            expect(mockStoreDispatch).toHaveBeenCalled()
            expect(mockStoreDispatch).toHaveBeenCalledWith({
                type: SET_FOOTER_DATA,
                data: mockData,
            })
        })

        it("should return the footer api data", () => {
            expect(mockStoreDispatch).toHaveBeenCalled()
        })
    })
})
