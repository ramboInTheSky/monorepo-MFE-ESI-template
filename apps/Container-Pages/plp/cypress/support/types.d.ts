declare namespace Cypress {
    interface Chainable<Subject> {
        shouldBeInViewport(): Chainable<Subject>
        shouldNotBeInViewport(): Chainable<Subject>
        closeCountrySelectorAndCookies(): Chainable<Subject>
    }
}
