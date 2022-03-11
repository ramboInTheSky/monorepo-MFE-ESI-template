import {getSettingsHeaders} from "@monorepo/utils"
import reducer, {SET_REQUEST, setRequestAction} from "."

jest.mock("@monorepo/utils", () => ({
    getSettingsHeaders: jest.fn(() => ({myHeader: "test 2"})),
}))

const mockDispatch = jest.fn()
const mockStore = {
    dispatch: mockDispatch,
}

const mockRequest = {
    url: "www.test.co.uk",
    headers: {myHeader: "test", "x-monorepo-siteurl": "http://www.mx.superman.com", "x-monorepo-territory": "gb"},
}

const initialState = {
    headers: null,
    url: null,
    isInternationalCountry: false,
}

const expectedState = {
    headers: {myHeader: "test 2"},
    url: "www.test.co.uk",
}

describe("reducers: request", () => {
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(undefined, {
                    type: "TEST" as any,
                    request: null,
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
                    request: null,
                }),
            ).toEqual({
                ...initialState,
            })
        })
    })

    describe("When called with SET_REQUEST", () => {
        it(`should update the state when x-monorepo-territory is mx`, () => {
            const newMockRequest = {
                ...mockRequest,
                headers: {
                    "x-monorepo-territory": "mx",
                },
            }
            expect(
                reducer(initialState, {
                    type: SET_REQUEST,
                    request: newMockRequest,
                }),
            ).toEqual({
                ...expectedState,
                isInternationalCountry: true,
            })
        })
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_REQUEST,
                    request: mockRequest,
                }),
            ).toEqual({
                ...expectedState,
                isInternationalCountry: false,
            })
        })

        it("should call getSettingsHeaders", () => {
            expect(getSettingsHeaders).toBeCalledWith(mockRequest.headers)
        })
    })
})

describe("Request - setRequestAction()", () => {
    describe("When called", () => {
        it("should call dispatch with a set request action", () => {
            setRequestAction(mockStore as any, mockRequest)
            expect(mockDispatch).toBeCalledWith({
                type: SET_REQUEST,
                request: mockRequest,
            })
        })
    })
})
