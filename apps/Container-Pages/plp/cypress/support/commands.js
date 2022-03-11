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

Cypress.Commands.add("shouldBeInViewport", {prevSubject: true}, subject => {
    const viewportHeight = Cypress.config("viewportHeight")
    const rect = subject[0].getBoundingClientRect()

    expect(rect.top).to.be.gte(0)
    expect(rect.top).to.be.lte(viewportHeight)

    return subject
})

Cypress.Commands.add("shouldNotBeInViewport", {prevSubject: true}, subject => {
    const viewportWidth = Cypress.config("viewportWidth")
    const viewportHeight = Cypress.config("viewportHeight")
    const rect = subject[0].getBoundingClientRect()

    expect(
        rect.top < 0 ||
            rect.top > viewportHeight ||
            (rect.left < 0 && rect.left < rect.width) ||
            rect.left > viewportWidth,
        `Element should not be in the viewport. Its dimensions are { top: ${rect.top} }`,
    ).to.be.true

    return subject
})

Cypress.Commands.add("closeCountrySelectorAndCookies", () => {
    const body = cy.get("body")
    body.then($body => {
        if ($body.find("[data-testid=country-selector-close-button]").length > 0) {
            cy.get("[data-testid=country-selector-close-button]")
                .click({force: true})
                .wait(300)
        }

        if ($body.find("header").length > 0 && $body.find("[data-testid=header-cookie-consent]").length > 0) {
            cy.get("[data-testid=header-cookie-consent]")
                .find("[data-testid=header-cookie-consent-close]")
                .click({force: true})
                .wait(300)
        }
    })
})
let EventDataList = []
Cypress.Commands.add("startTrackingEvents", () => {
    EventDataList = []
    cy.window().then(win => {
        win.subjects.setupEvent("$ TRACK_EVENT")
        win.subjects["$ TRACK_EVENT"].subscribe(data => EventDataList.push(data))
    })
})

Cypress.Commands.add("shouldHaveTrackedEvent", eventData => {
    cy.window().then(win => {
        if (EventDataList.length <= 0) {
            win.subjects["$ TRACK_EVENT"].subscribe(data => EventDataList.push(data))
        }
        expect(EventDataList.some(t => JSON.stringify(t) == JSON.stringify(eventData))).to.equal(
            true,
            `Event data does not match: expected ${JSON.stringify(eventData)} actual ${JSON.stringify(
                EventDataList[0],
            )}`,
        )
    })
})

Cypress.Commands.add("shouldTrackEvent", eventData => {
    cy.window().then(win => {
        let lastEventData
        win.subjects["$ TRACK_EVENT"].subscribe(data => (lastEventData = data))
        expect(lastEventData).to.deep.equal(
            eventData,
            `Event data does not match: expected ${JSON.stringify(eventData)} actual ${JSON.stringify(lastEventData)}`,
        )
    })
})
