import {mockState, mockText} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"
import State from "../../models/State"

describe("Given connect - mapStateToProps()", () => {
    it("should project state and only return button related state attributes", () => {
        expect(mapStateToProps(mockState)).toEqual({            
            filteredFacets: {},
            isFilterSelected: false,
            isFilteredPrice: true,
            text: mockText
        })
    })
    it("should project state and return filteredFacets", () => {
        const newMockState: State = {
            ...mockState,
            search: {
                ...mockState.search,
                facets: {
                    ...mockState.search.facets,
                    opt1: {
                        n: "opt1",
                        c: 1,
                        v: "opt1",
                        s: true,
                        incompatibleWith: [],
                        d: false,
                    },
                    opt2: {
                        n: "opt2",
                        c: 1,
                        v: "opt2",
                        s: true,
                        incompatibleWith: ["opt3"],
                        d: false,
                    },
                    opt3: {
                        n: "opt3",
                        c: 1,
                        v: "opt3",
                        incompatibleWith: ["opt2"],
                        d: false,
                    },
                },
            },
        }
        expect(mapStateToProps(newMockState)).toEqual({                        
            filteredFacets: {
                "Test 1": ["opt1"],
                "Test 2": ["opt2"],
            },
            isFilterSelected: true,
            isFilteredPrice: true,
            text: mockText
        })
    })
})