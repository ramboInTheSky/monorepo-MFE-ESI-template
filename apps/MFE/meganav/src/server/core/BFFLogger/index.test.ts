/* eslint-disable @typescript-eslint/unbound-method */
import Logger from "@monorepo/core-logger"
import {defaultClient} from "applicationinsights"
import BFFLogger from "."

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

jest.mock("applicationinsights", () => ({
    defaultClient: {
        trackTrace: jest.fn(),
        trackException: jest.fn(),
    },
}))

describe("BFFLogger", () => {
    it("call trackTrace and Logger when called with warn", () => {
        BFFLogger.warn("This is a warning!")
        expect(defaultClient.trackTrace).toHaveBeenCalledWith({message: "This is a warning!", severity: 2})
        expect(Logger.warn).toHaveBeenCalled()
    })

    it("call trackException and Logger when called with error", () => {
        BFFLogger.error("This is an error!!!")
        expect(defaultClient.trackException).toHaveBeenCalledWith({exception: Error("This is an error!!!")})
        expect(Logger.error).toHaveBeenCalled()
    })
})
