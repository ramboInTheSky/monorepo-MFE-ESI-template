import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Components/MissionsCTA - Given connect - mapStateToProps()", () => {
    const siteUrl = "http://superman"
    it("should transform the target and return the data", () => {
        const ownProps = {
            imageUrl: "//abc",
            target: "/abc",
            title: "abc",
            department: "abc",
        }

        const newMockState = {
            ...mockState,
            request: {
                ...mockState.request,
                siteUrl,
            },
        }

        const got = mapStateToProps(newMockState, ownProps)
        expect(got).toEqual({
            department: "abc",
            imageUrl: "//abc",
            siteUrl: "http://superman",
            target: "/abc",
            title: "abc",
        })
    })
    it("should transform the imageUrl and return the data", () => {
        const ownProps = {
            imageUrl: "/abc",
            target: "//abc.afff",
            title: "abc",
            department: "abc",
        }

        const newMockState = {
            ...mockState,
            request: {
                ...mockState.request,
                siteUrl,
            },
        }

        const got = mapStateToProps(newMockState, ownProps)
        expect(got).toEqual({
            department: "abc",
            imageUrl: `${siteUrl}/abc`,
            siteUrl: "http://superman",
            target: "//abc.afff",
            title: "abc",
        })
    })
})
