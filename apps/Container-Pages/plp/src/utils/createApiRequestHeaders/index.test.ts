import utils from "@monorepo/utils"
import createApiRequestHeaders from "."

import env from "../../config/env"

env.REACT_APP_USE_TIME_MACHINE_COOKIE = "true"

jest.mock("@monorepo/utils", () => ({
    getSettingsHeaders: jest.fn(() => ({
        "x-monorepo-correlation-id": "test correlation id",
        otherHeader: "test",
    })),
}))

const mockRequest = {}
describe("Given a createApiRequestHeaders", () => {
    describe("When getting headers for a request", () => {
        let response: any = null
        beforeAll(() => {
            response = createApiRequestHeaders(mockRequest as any)
        })

        it("should call getSettingsHeaders ", () => {
            expect(utils.getSettingsHeaders).toHaveBeenCalledWith(mockRequest)
        })

        it("should return the correlation id header", () => {
            expect(response).toEqual({"x-monorepo-correlation-id": "test correlation id"})
        })
    })

    describe("When getting headers for a request with personas", () => {
        let response: any = null
        beforeAll(() => {
            jest.spyOn(utils, "getSettingsHeaders").mockImplementationOnce(
                () =>
                    ({
                        "x-monorepo-correlation-id": "test correlation id",
                        "x-monorepo-persona": "test persona",
                        otherHeader: "test",
                    } as any),
            )

            response = createApiRequestHeaders(mockRequest as any)
        })

        it("should return the correlation id header", () => {
            expect(response).toEqual({
                "x-monorepo-correlation-id": "test correlation id",
                "x-monorepo-persona": "test persona",
            })
        })
    })

    describe("When getting headers for a request with time machine enabled", () => {
        let response: any = null
        const mockTimeMachineRequest = {
            "x-monorepo-time-machine-date": "time machine date",
        }
        beforeAll(() => {
            jest.spyOn(utils, "getSettingsHeaders").mockImplementationOnce(
                () =>
                    ({
                        "x-monorepo-correlation-id": "test correlation id",
                        "x-monorepo-persona": "test persona",

                        otherHeader: "test",
                    } as any),
            )

            response = createApiRequestHeaders(mockTimeMachineRequest as any)
        })

        it("should return the correlation id header", () => {
            expect(response).toEqual({
                "x-monorepo-correlation-id": "test correlation id",
                "x-monorepo-persona": "test persona",
                "x-monorepo-time-machine-date": "time machine date",
            })
        })
    })

    describe("When getting headers for a request with time machine disabled", () => {
        let response: any = null
        const mockTimeMachineRequest = {
            "x-monorepo-time-machine-date": "time machine date",
        }
        beforeAll(() => {
            jest.spyOn(utils, "getSettingsHeaders").mockImplementationOnce(
                () =>
                    ({
                        "x-monorepo-correlation-id": "test correlation id",
                        "x-monorepo-persona": "test persona",

                        otherHeader: "test",
                    } as any),
            )

            env.REACT_APP_USE_TIME_MACHINE_COOKIE = "false"

            response = createApiRequestHeaders(mockTimeMachineRequest as any)
        })

        it("should return the correlation id header", () => {
            expect(response).toEqual({
                "x-monorepo-correlation-id": "test correlation id",
                "x-monorepo-persona": "test persona",
            })
        })

        afterAll(() => {
            env.REACT_APP_USE_TIME_MACHINE_COOKIE = "true"
        })
    })
})
