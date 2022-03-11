import React from "react"
import logger from "@monorepo/core-logger"
import {render} from "@testing-library/react"
import ClientApp from "./ClientApp"
import MainApp from "../App"

jest.mock("../App", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: jest.fn(({children}) => {
        return <div>TEST APP COMPONENT {children}</div>
    }),
}))

describe("Given a ClientApp", () => {
    it("should match the snapshot", () => {
        const {asFragment} = render(<ClientApp />)
        expect(asFragment()).toMatchSnapshot()
    })

    describe("when there is an error", () => {
        beforeEach(() => {
            jest.spyOn(logger, "error")
            ;(MainApp as jest.Mock).mockImplementationOnce(() => {
                throw new Error("Oh no")
            })
        })
        it("calls the logger", () => {
            render(<ClientApp />)

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(logger.error).toHaveBeenCalledWith(expect.stringMatching("Error: Oh no"), "")
        })
    })

    it("should remove parent jss element tag", () => {
        const mockRemover = jest.fn()
        const mockElement = {
            id: "fake-element",
            parentNode: {
                removeChild: mockRemover,
            },
        }
        const spy = jest.spyOn(Document.prototype, "getElementById").mockImplementation(() => mockElement as any)

        render(<ClientApp />)

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(Document.prototype.getElementById).toHaveBeenCalledWith("product-summary-jss-server-side-custom")
        expect(mockElement.parentNode.removeChild).toHaveBeenCalledWith(mockElement)
        spy.mockRestore()
    })
})
