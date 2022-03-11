import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Given connect - mapStateToProps()", () => {
    it("should project state and only return realm", () => {
        const ownProps = {
            ariaValueText: "abc",
            testid: "testid_abc",
        }
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
        expect(mapStateToProps(newMockState, ownProps)).toEqual({
            ariaValueText: "abc",
            realm: "amido",
            testid: "testid_abc",
        })
    })
})
