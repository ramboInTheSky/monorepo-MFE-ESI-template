/// <reference types="Cypress" />

const TestFilter = (definedTags: string[], runTest: Function) => {
    if (Cypress.env("TEST_TAGS")) {
        const tags = Cypress.env("TEST_TAGS").split(",")
        const isFound = definedTags.some(definedTag => tags.includes(definedTag))

        if (isFound) {
            runTest()
        }
    }
}

export const TestDataSwitcher = (definedTags: string[], pass, fail) => {
    if (Cypress.env("TEST_TAGS")) {
        const tags = Cypress.env("TEST_TAGS").split(",")
        const isFound = definedTags.some(definedTag => tags.includes(definedTag))

        return isFound ? pass : fail
    }
}

export default TestFilter
