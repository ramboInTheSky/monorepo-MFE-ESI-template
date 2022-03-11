import {doCookiePolicy, doCountryRedirect, doGoogleAnalytics, doGTMDataLayerEvents, doMonetateEvents, doSearchABAdaptor, doUserVariables} from "."

import * as getWindowUtils from "../window"

jest.mock("../window", () => ({
    getWindow: jest.fn(() => ({
        document: {getElementById: jest.fn(() => ({}))},
    })),
}))

afterAll(() => {
    jest.resetAllMocks()
})

describe("Given a doCookiePolicy", () => {
    describe("When run on the server", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(() => null)
        })
        it("should return false", () => {
            expect(doCookiePolicy()).toEqual(false)
        })
    })
    describe("When run on PLP", () => {
        it("should return true", () => {
            expect(doCookiePolicy()).toEqual(true)
        })
    })

    describe("When run on MVC with feature flag set", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        document: {getElementById: jest.fn(() => null)},
                        platmodflags: {modernisedCookieConsent: true},
                    } as any),
            )
        })

        it("should return true", () => {
            expect(doCookiePolicy()).toEqual(true)
        })
    })

    describe("When run on MVC with feature flag not set", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        document: {getElementById: jest.fn(() => null)},
                        platmodflags: {},
                    } as any),
            )
        })

        it("should return false", () => {
            expect(doCookiePolicy()).toEqual(false)
        })
    })

    describe("When run on MVC with feature flag not exists", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        document: {getElementById: jest.fn(() => null)},
                    } as any),
            )
        })

        it("should return false", () => {
            expect(doCookiePolicy()).toEqual(false)
        })
    })
})

describe("Given a doCountryRedirect", () => {
    describe("When run on the server", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(() => null)
        })
        it("should return false", () => {
            expect(doCountryRedirect()).toEqual(false)
        })
    })
    describe("When run on PLP", () => {
        it("should return true", () => {
            expect(doCountryRedirect()).toEqual(true)
        })
    })

    describe("When run on MVC with feature flag set", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        document: {getElementById: jest.fn(() => null)},
                        platmodflags: {countryRedirect: true},
                    } as any),
            )
        })

        it("should return true", () => {
            expect(doCountryRedirect()).toEqual(true)
        })
    })

    describe("When run on MVC with feature flag not set", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        document: {getElementById: jest.fn(() => null)},
                        platmodflags: {},
                    } as any),
            )
        })

        it("should return false", () => {
            expect(doCountryRedirect()).toEqual(false)
        })
    })

    describe("When run on MVC with feature flag not exists", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        document: {getElementById: jest.fn(() => null)},
                    } as any),
            )
        })

        it("should return false", () => {
            expect(doCountryRedirect()).toEqual(false)
        })
    })
})

describe("Given a doGoogleAnalytics", () => {
    describe("When run on the server", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(() => null)
        })
        it("should return false", () => {
            expect(doGoogleAnalytics()).toEqual(false)
        })
    })
    describe("When run on PLP", () => {
        it("should return true", () => {
            expect(doGoogleAnalytics()).toEqual(true)
        })
    })

    describe("When run on MVC with feature flag set", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        document: {getElementById: jest.fn(() => null)},
                        platmodflags: {googleAnalytics: true},
                    } as any),
            )
        })

        it("should return true", () => {
            expect(doGoogleAnalytics()).toEqual(true)
        })
    })

    describe("When run on MVC with feature flag not set", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        document: {getElementById: jest.fn(() => null)},
                        platmodflags: {},
                    } as any),
            )
        })

        it("should return false", () => {
            expect(doGoogleAnalytics()).toEqual(false)
        })
    })

    describe("When run on MVC with feature flag not exists", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        document: {getElementById: jest.fn(() => null)},
                    } as any),
            )
        })

        it("should return false", () => {
            expect(doGoogleAnalytics()).toEqual(false)
        })
    })
})

describe("Given a doGTMDataLayerEvents", () => {
    describe("When run on the server", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(() => null)
        })
        it("should return false", () => {
            expect(doGTMDataLayerEvents()).toEqual(false)
        })
    })
    describe("When run on PLP", () => {
        it("should return true", () => {
            expect(doGTMDataLayerEvents()).toEqual(true)
        })
    })

    describe("When run on MVC with feature flag set", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        document: {getElementById: jest.fn(() => null)},
                        platmodflags: {gtmDataLayerEvents: true},
                    } as any),
            )
        })

        it("should return true", () => {
            expect(doGTMDataLayerEvents()).toEqual(true)
        })
    })

    describe("When run on MVC with feature flag not set", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        document: {getElementById: jest.fn(() => null)},
                        platmodflags: {},
                    } as any),
            )
        })

        it("should return false", () => {
            expect(doGTMDataLayerEvents()).toEqual(false)
        })
    })

    describe("When run on MVC with feature flag not exists", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        document: {getElementById: jest.fn(() => null)},
                    } as any),
            )
        })

        it("should return false", () => {
            expect(doGTMDataLayerEvents()).toEqual(false)
        })
    })
})

describe("Given a doMonetateEvents", () => {
    describe("When run on the server", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(() => null)
        })
        it("should return false", () => {
            expect(doMonetateEvents()).toEqual(false)
        })
    })
    describe("When run on PLP", () => {
        it("should return true", () => {
            expect(doMonetateEvents()).toEqual(true)
        })
    })

    describe("When run on MVC with feature flag set", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        document: {getElementById: jest.fn(() => null)},
                        platmodflags: {monetateEvents: true},
                    } as any),
            )
        })

        it("should return true", () => {
            expect(doMonetateEvents()).toEqual(true)
        })
    })

    describe("When run on MVC with feature flag not set", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        document: {getElementById: jest.fn(() => null)},
                        platmodflags: {},
                    } as any),
            )
        })

        it("should return false", () => {
            expect(doMonetateEvents()).toEqual(false)
        })
    })

    describe("When run on MVC with feature flag not exists", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        document: {getElementById: jest.fn(() => null)},
                    } as any),
            )
        })

        it("should return false", () => {
            expect(doMonetateEvents()).toEqual(false)
        })
    })
})

describe("Given a doSearchABAdaptor", () => {
    describe("When run on the server", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(() => null)
        })
        it("should return false", () => {
            expect(doSearchABAdaptor()).toEqual(false)
        })
    })
    describe("When run on PLP", () => {
        it("should return true", () => {
            expect(doSearchABAdaptor()).toEqual(true)
        })
    })

    describe("When run on MVC with feature flag set", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        document: {getElementById: jest.fn(() => null)},
                        platmodflags: {searchABAdaptor: true},
                    } as any),
            )
        })

        it("should return true", () => {
            expect(doSearchABAdaptor()).toEqual(true)
        })
    })

    describe("When run on MVC with feature flag not set", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        document: {getElementById: jest.fn(() => null)},
                        platmodflags: {},
                    } as any),
            )
        })

        it("should return false", () => {
            expect(doSearchABAdaptor()).toEqual(false)
        })
    })

    describe("When run on MVC with feature flag not exists", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        document: {getElementById: jest.fn(() => null)},
                    } as any),
            )
        })

        it("should return false", () => {
            expect(doSearchABAdaptor()).toEqual(false)
        })
    })
})

describe("Given a doUserVariables", () => {
    describe("When run on the server", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockReturnValue(null)
        })
        it("should return false", () => {
            expect(doUserVariables()).toEqual(false)
        })
    })
    describe("When run on PLP", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockReturnValue({
                document: {getElementById: jest.fn(() => ({}))},
                platmodflags: {userVariables: false},
            } as any)
        })

        it("should return true", () => {
            expect(doUserVariables()).toEqual(true)
        })
    })

    describe("When run on MVC with feature flag set", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockReturnValue({
                document: {getElementById: jest.fn(() => null)},
                platmodflags: {userVariables: true},
            } as any)
        })

        it("should return true", () => {
            expect(doUserVariables()).toEqual(true)
        })
    })

    describe("When run on MVC with feature flag not set", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockReturnValue({
                document: {getElementById: jest.fn(() => null)},
                platmodflags: {},
            } as any)
        })

        it("should return true", () => {
            expect(doUserVariables()).toEqual(false)
        })
    })

    describe("When run on MVC with feature flag not exists", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockReturnValue({
                document: {getElementById: jest.fn(() => null)},
            } as any)
        })

        it("should return false", () => {
            expect(doUserVariables()).toEqual(false)
        })
    })
})

