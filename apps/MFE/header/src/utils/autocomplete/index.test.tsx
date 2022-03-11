import {Focus, handleKeyboardTapping, handleClick} from "."
import {removeFromLocalStorage} from "../removeFromLocalStorage"

jest.mock("../removeFromLocalStorage", () => {
    return {removeFromLocalStorage: jest.fn()}
})

describe("Autocomplete events: ", () => {
    test("should call handlefocus when Focus triggered", () => {
        const term = "dress"
        const suggestion = "dressing gown"
        const handleFocus = jest.fn()
        const event = {preventDefault: jest.fn()} as any

        Focus(term, suggestion, handleFocus)(event)

        expect(event.preventDefault).toHaveBeenCalled()
        expect(handleFocus).toHaveBeenCalled()
        expect(handleFocus).toHaveBeenCalledWith(term, suggestion)
    })

    test("should not call handlefocus when Focus is triggered without third param", () => {
        const term = "dress"
        const suggestion = "dressing gown"
        const handleFocus = jest.fn()
        const event = {preventDefault: jest.fn()} as any

        Focus(term, suggestion)(event)

        expect(event.preventDefault).toHaveBeenCalled()
        expect(handleFocus).not.toHaveBeenCalled()
    })

    test("should not call handleFocus when handleKeyboardTapping is triggered without third param", () => {
        const term = "dress"
        const suggestion = "dressing gown"
        const handleFocus = jest.fn()
        const event = {preventDefault: jest.fn()} as any

        handleKeyboardTapping(term, suggestion)(event)

        expect(event.preventDefault).toHaveBeenCalled()
        expect(handleFocus).not.toHaveBeenCalled()
    })

    test("should call handleFocus when handleKeyboardTapping is triggered", () => {
        const term = "dress"
        const suggestion = "dressing gown"
        const handleFocus = jest.fn()
        const event = {preventDefault: jest.fn()} as any

        handleKeyboardTapping(term, suggestion, handleFocus)(event)

        expect(event.preventDefault).toHaveBeenCalled()
        expect(handleFocus).toHaveBeenCalled()
        expect(handleFocus).toHaveBeenCalledWith(term, suggestion)
    })

    test("should call removeFromLocalStorage and handleSuggestionClick when handleClick is triggered", () => {
        const suggestion = "dress"
        const handleSuggestionClick = jest.fn()
        const event = {preventDefault: jest.fn()} as any

        handleClick(suggestion, handleSuggestionClick)(event)

        expect(event.preventDefault).toHaveBeenCalled()
        expect(removeFromLocalStorage).toHaveBeenCalled()
        expect(handleSuggestionClick).toHaveBeenCalled()
        expect(handleSuggestionClick).toHaveBeenCalledWith(suggestion)
    })
})
