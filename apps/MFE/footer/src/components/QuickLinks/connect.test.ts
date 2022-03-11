import {mockState} from "../../../__mocks__/mockStore"
import {mergeProps, mapStateToProps} from "./connect"

describe("Given connect - mapStateToProps()", () => {
    it("should project state and only return users", () => {
        expect(mapStateToProps(mockState)).toEqual({
            user: mockState.user,
            showLangSelector: true,
        })
    })
})

describe("Given connect - mergeProps", () => {
    it("should merge the properties", () => {
        expect(mergeProps(mockState, {dispatch: ""}, {test: "test"})).toEqual({
            ...mockState,
            test: "test",
            accountStatusChanged: expect.any(Function),
        })
    })
    it("should have dispatched SET_USER when accountStatusChanged is called", () => {
        const dispatch = jest.fn()
        const got = mergeProps(mockState, {dispatch}, {test: "test"})
        expect(got.accountStatusChanged).toBeTruthy()
        got.accountStatusChanged("MOCK_FIRSTNAME")

        expect(dispatch).toHaveBeenCalledWith({
            type: "SET_USER",
            user: {accountFirstName: "MOCK_FIRSTNAME", loggedIn: true},
        })
    })
})
