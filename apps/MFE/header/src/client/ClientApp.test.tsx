import React from "react"
import logger from "@monorepo/core-logger"
import {render} from "@testing-library/react"
import ClientApp from "./ClientApp"

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

jest.mock("../App", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: ({children}) => {
        return <div>TEST APP COMPONENT {children}</div>
    },
}))

describe("ClientApp", () => {
    it("should match the snapshot", () => {
        const {asFragment} = render(<ClientApp />)
        expect(asFragment()).toMatchSnapshot()
    })

    describe("<ClientApp>", () => {
        it(`calls the logger when there's an error`, () => {
            try {
                const Throws = () => {
                    throw new Error("Oh no!")
                }
                render(
                    <ClientApp>
                        <Throws />
                    </ClientApp>,
                )
                // eslint-disable-next-line @typescript-eslint/unbound-method
                expect(logger.error).toHaveBeenCalled()
                // eslint-disable-next-line @typescript-eslint/unbound-method
                expect(logger.error).toHaveBeenCalledWith("Oh no!", document.cookie)
            } catch {
                // this will never happen
            }
        })
    })
})
