/* eslint-disable @typescript-eslint/unbound-method */
import Logger from "@monorepo/core-logger"
import {defaultClient} from "applicationinsights"
import BFFLogger from "."

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
}))

jest.mock("applicationinsights", () => ({
    defaultClient: {
        trackTrace: jest.fn(),
        trackException: jest.fn(),
        trackDependency: jest.fn(),
    },
}))

describe("BFFLogger", () => {
    beforeEach(() => {
        jest.resetModules()
    })

    it("calls trackTrace and Logger when called with warn", () => {
        BFFLogger.warn("This is a warning!")
        expect(defaultClient.trackTrace).toHaveBeenCalledWith({message: "This is a warning!", severity: 2})
        expect(Logger.warn).toHaveBeenCalled()
    })

    it("calls trackException and Logger when called with error", () => {
        BFFLogger.error("This is an error!!!")
        expect(defaultClient.trackException).toHaveBeenCalledWith({exception: Error("This is an error!!!")})
        expect(Logger.error).toHaveBeenCalled()
    })

    it("calls trackDependency correctly", () => {
        const message = "message"
        const calledData = {
            target: message,
            name: message,
            data: "n/a",
            duration: 1,
            resultCode: 0,
            success: true,
            dependencyTypeName: message,
        }
        BFFLogger.dependency(message, 1)
        expect(defaultClient.trackDependency).toHaveBeenCalledWith(calledData)
    })
})
