import {setFiltersAlphabetAction} from "../../ducks/viewAllModal"
import {mockState, mockText as text} from "../../../__mocks__/mockStore"
import {mapStateToProps, mergeProps} from "./connect"

const mockedState = {
    facets: mockState.viewAllModal.facets,
    activeCharacter: mockState.viewAllModal.activeCharacter,
    text
}

const mockAlphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z", ]

describe("Given connect - mapStateToProps()", () => {
    it("should project state and only return facets", () => {
        expect(mapStateToProps(mockState)).toEqual(mockedState)
    })
})

describe("Given connect - mergeProps()", () => {
    const mockDispatch = jest.fn()
    const mockMappedState = {
        facets: mockState.viewAllModal.facets,
        activeCharacter: mockState.viewAllModal.activeCharacter,
        text
    }
    let actualMergeProps

    beforeAll(() => {
        actualMergeProps = mergeProps(mockMappedState, {dispatch: mockDispatch} as any, {test: "test"})
    })

    it("should add state functions", () => {
        expect(actualMergeProps).toEqual({
            ...mockMappedState,
            test: "test",
            clickableCharacters: ["O"],
            clickableNumeric: false,
            handleSetFiltersAlphabet: expect.any(Function),
            text,
            alphabet: mockAlphabet
        })
    })

    it("should create a handleSetFiltersAlphabet function", () => {
        actualMergeProps.handleSetFiltersAlphabet("O")
        expect(mockDispatch).toHaveBeenCalledWith(setFiltersAlphabetAction("O"))
    })

    describe("clickableCharacters", () => {
        it("should correctly identify characters with items", () => {
            const facets = {
                opt1: {n: "shirt", c: 1, v: "shirt", incompatibleWith: [], d: false},
                opt2: {n: "overalls", c: 1, v: "overalls", incompatibleWith: [], d: false},
                opt3: {n: "breeches", c: 1, v: "breeches", incompatibleWith: [], d: false},
            }
            const mockMergeProps = mergeProps({facets, text}, {dispatch: mockDispatch} as any, {test: "test"})
            expect(mockMergeProps).toEqual({
                facets,
                test: "test",
                clickableCharacters: ["B", "O", "S"],
                clickableNumeric: false,
                handleSetFiltersAlphabet: expect.any(Function),
                text,
                alphabet: mockAlphabet
            })
        })

        it("should correctly identify characters when items have upper and lowercase", () => {
            const facets = {
                opt1: {n: "Apple", c: 1, v: "Apple", incompatibleWith: [], d: false},
                opt2: {n: "Banana", c: 1, v: "Banana", incompatibleWith: [], d: false},
                opt3: {n: "cherry", c: 1, v: "cherry", incompatibleWith: [], d: false},
            }
            const mockMergeProps = mergeProps({facets, text}, {dispatch: mockDispatch} as any, {test: "test"})
            expect(mockMergeProps).toEqual({
                facets,
                test: "test",
                clickableCharacters: ["A", "B", "C"],
                clickableNumeric: false,
                handleSetFiltersAlphabet: expect.any(Function),
                text,
                alphabet: mockAlphabet
            })
        })

        it("should set clickableNumeric to true when items that start with a number exist", () => {
            const facets = {
                opt1: {n: "3XL", c: 1, v: "3XL", incompatibleWith: [], d: false},
                opt2: {n: "6L", c: 1, v: "6L", incompatibleWith: [], d: false},
                opt3: {n: "cherry", c: 1, v: "cherry", incompatibleWith: [], d: false},
            }

            const mockMergeProps = mergeProps({facets, text}, {dispatch: mockDispatch} as any, {test: "test"})
            expect(mockMergeProps).toEqual({
                facets,
                test: "test",
                clickableCharacters: ["C"],
                clickableNumeric: true,
                handleSetFiltersAlphabet: expect.any(Function),
                text,
                alphabet: mockAlphabet
            })
        })
    })
})
