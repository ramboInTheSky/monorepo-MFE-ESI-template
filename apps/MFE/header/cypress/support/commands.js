// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("preserveConsentCookies", () => {
    Cypress.Cookies.preserveOnce('OptanonConsent')
    Cypress.Cookies.preserveOnce('OptanonAlertBoxClosed')
    Cypress.Cookies.preserveOnce('NextConsentCookie')
    Cypress.Cookies.preserveOnce('NextDirectConsentCookie')

    cy.wait(300)
    const body = cy.get("body")
    body.then($body => {
        if ($body.find("#header-entrypoint").length > 0) {
            cy.get("#header-entrypoint")
              .click({force: true})
              .wait(100)
        }
    })
})