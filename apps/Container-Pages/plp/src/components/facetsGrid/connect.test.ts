import State from "models/State"
import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps, mergeProps} from "./connect"
import {setFilterModal} from "../../ducks/viewAllModal"
import {FacetsAlphabetValues} from "../../models/FacetsState"
import TrackViewAllModalFilterSelect from "../../events/trackEvent/events/viewAllModalFilterSelect"
import TrackViewAllModalFilterDeselect from "../../events/trackEvent/events/viewAllModalFilterDeselect"

jest.mock("../../events/trackEvent/events/viewAllModalFilterSelect")
jest.mock("../../events/trackEvent/events/viewAllModalFilterDeselect")

describe("Given connect - mapStateToProps()", () => {
    let testState: State
    beforeEach(() => {
        testState = {...mockState}
    })

    it("should return all facets correctly", () => {
        expect(mapStateToProps(testState)).toMatchSnapshot()
    })

    it("should only return numeric characters", () => {
        testState.viewAllModal = {
            ...testState.viewAllModal,
            activeCharacter: FacetsAlphabetValues.Numeric,
            facets: {
                opt1: {
                    n: "1test",
                    v: "1test",
                    c: 1,
                    incompatibleWith: [],
                    d: false,
                },
                opt2: {
                    n: "test",
                    v: "test",
                    c: 1,
                    incompatibleWith: [],
                    d: false,
                },
            },
        }
        const expected = {
            facets: [testState.viewAllModal.facets.opt1],
        }
        expect(mapStateToProps(testState)).toEqual(expected)
    })

    it("should return facets starting with 'T'", () => {
        testState.viewAllModal = {
            ...testState.viewAllModal,
            activeCharacter: "T",
            facets: {
                opt1: {
                    n: "1test",
                    v: "1test",
                    c: 1,
                    incompatibleWith: [],
                    d: false,
                },
                opt2: {
                    n: "test",
                    v: "test",
                    c: 1,
                    incompatibleWith: [],
                    d: false,
                },
            },
        }
        const expected = {
            facets: [testState.viewAllModal.facets.opt2],
        }
        expect(mapStateToProps(testState)).toEqual(expected)
    })
})

describe("Given connect - mergeProps()", () => {
    const mockDispatch = jest.fn()
    const mockMappedState = {
        facets: [
            {v: "test-unselected", s: false},
            {v: "test-selected", s: true},
        ],
    }
    let actualMergeProps
    beforeAll(() => {
        actualMergeProps = mergeProps(mockMappedState as any, {dispatch: mockDispatch} as any, {modalExtension: true})
    })

    it("should add state functions", () => {
        expect(actualMergeProps).toEqual({
            ...mockMappedState,
            handleSetFacet: expect.any(Function),
            modalExtension: true,
        })
    })

    it("should create a handleSetFacet function", () => {
        actualMergeProps.handleSetFacet("facet-value-test")
        expect(mockDispatch).toHaveBeenCalledWith(setFilterModal("facet-value-test"))
    })

    it("should create a handleSetFacet function that calls TrackViewAllModalFilterSelect", () => {
        actualMergeProps.handleSetFacet("test-unselected")
        expect(TrackViewAllModalFilterSelect).toHaveBeenCalledWith("test-unselected")
    })

    it("should create a handleSetFacet function that calls TrackViewAllModalFilterDeselect", () => {
        actualMergeProps.handleSetFacet("test-selected")
        expect(TrackViewAllModalFilterDeselect).toHaveBeenCalledWith("test-selected")
    })
})
