/* eslint-disable jest/no-mocks-import */
/* eslint-disable @typescript-eslint/unbound-method */
import logger from "@monorepo/core-logger"
import * as mockData from "../../../__mocks__/amido.json"
import reducer, {SET_HEADER_DATA, getHeaderDataThunk} from "."

const mockStoreDispatch = jest.fn()

const mockStore = {
    dispatch: mockStoreDispatch,
    getState: jest.fn(() => ({request: {headers: ""}})),
}

jest.mock("@app/api/headerdata", () => ({
    getHeaderData: jest.fn(async (_headers, version) => {
        if (version === "error") {
            throw new Error()
        }
        return Promise.resolve(mockData)
    }),
}))

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

const initialState = null

const expectedState = mockData
describe("reducers: search", () => {
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

    describe("When called with SET_HEADER_DATA", () => {
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_HEADER_DATA,
                    data: mockData as any,
                }),
            ).toEqual(expectedState)
        })
    })
})

describe("Store: getHeaderDataThunk() ", () => {
    describe("When loading header data", () => {
        beforeEach(() => {
            const _getHeaderData = getHeaderDataThunk(mockStore as any, "v1.5.4")
        })
        it("should call the store dispatch", () => {
            expect(mockStoreDispatch).toHaveBeenCalled()
            expect(mockStoreDispatch).toHaveBeenCalledWith({
                type: SET_HEADER_DATA,
                data: mockData,
            })
        })

        it("should return the header api data", () => {
            expect(mockStoreDispatch).toHaveBeenCalled()
        })
    })

    describe("When loading header data - error state", () => {
        beforeEach(() => {
            const _getHeaderData = getHeaderDataThunk(mockStore as any, "error")
        })

        it("should log error", () => {
            expect(logger.error).toHaveBeenCalled()
        })

        it("should set default header model", () => {
            expect(mockStore.dispatch).toHaveBeenCalled()
        })
    })
})
