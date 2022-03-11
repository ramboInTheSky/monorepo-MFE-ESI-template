/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/unbound-method */
import {GetVisitorToken, GetVisitorTokenCallback} from "."
import Emitter from "../../../eventEmitter"

jest.mock("../../../eventEmitter", () => ({
    emit: jest.fn(),
    listen: jest.fn(),
}))

describe("Given a GetVisitorToken ESB", () => {
    const mockGetVisitorTokenData = {consent: ["test"]}
    describe("When publishing", () => {
        beforeAll(() => {
            const getVisitorTokenEsb = new GetVisitorToken()
            getVisitorTokenEsb.publish(mockGetVisitorTokenData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("VISITOR_TOKEN_GET", mockGetVisitorTokenData)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const getVisitorTokenEsb = new GetVisitorToken()
            getVisitorTokenEsb.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("VISITOR_TOKEN_GET", mockCallback)
        })
    })
})

describe("Given a GetVisitorTokenCallback ESB", () => {
    describe("When publishing", () => {
        const mockPublishData = {
            data: {
                visitorInfo: {
                    aud: "string",
                    client_id: "string",
                    consent: {
                        essential_cookies: false,
                        functional_cookies: false,
                        performance_cookies: false,
                        marketing_cookies: false,
                    },
                    exp: 1,
                    iat: 2,
                    iss: "string",
                    nbf: 3,
                    sub: "string",
                    visitor: {
                        id: "string",
                        state: "string",
                    },
                },
                visitorToken: "string",
            },
        }

        beforeAll(() => {
            const getVisitorTokenCallbackEsb = new GetVisitorTokenCallback()
            getVisitorTokenCallbackEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith("VISITOR_TOKEN_GET_CALLBACK", mockPublishData)
        })
    })

    describe("When subscribing", () => {
        const mockCallback = jest.fn()

        beforeAll(() => {
            const getVisitorTokenCallbackEsb = new GetVisitorTokenCallback()
            getVisitorTokenCallbackEsb.subscribe(mockCallback)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.listen).toHaveBeenCalledWith("VISITOR_TOKEN_GET_CALLBACK", mockCallback)
        })
    })
})
