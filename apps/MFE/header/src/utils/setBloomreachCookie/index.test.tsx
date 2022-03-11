/* eslint-disable @typescript-eslint/unbound-method */
import Cookies from "js-cookie"
import setBloomreachCookie from "."

describe("Given a setBloomreachCookie util", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it("Should set a new cookie if the Bloomreach cookie exists", () => {
        Cookies.get = jest.fn().mockImplementation(() => "uid%3D8380269078389%3Av%3D13.0%3Ats%3D1612884264180%3Ahc%3D1")
        Cookies.set = jest.fn().mockImplementation(() => "")
        setBloomreachCookie("_br_val_1,_br_val_2,_br_val_3,_br_val_4", true, ".amido.com")
        expect(Cookies.set).toBeCalledWith("_br_mt_search", "_br_val_4", {expires: 1, domain: ".amido.com"})
    })

    it("Should not set a new cookie if the Bloomreach cookie exists, but is empty", () => {
        Cookies.get = jest.fn().mockImplementation(() => "")
        Cookies.set = jest.fn().mockImplementation(() => "")
        setBloomreachCookie("_br_val_1,_br_val_2,_br_val_3,_br_val_4", true, ".amido.com")
        expect(Cookies.set).not.toBeCalled()
    })

    it("Should not set a new cookie if the Bloomreach cookie exists, but the decoded version's UID length does not match the expected UID length", () => {
        Cookies.get = jest.fn().mockImplementation(() => "test")
        Cookies.set = jest.fn().mockImplementation(() => "")
        Cookies.remove = jest.fn().mockImplementation()

        const _spy = jest.spyOn(global, "decodeURIComponent").mockReturnValueOnce("te=1:test=2:test2=3:test4=5")

        setBloomreachCookie("_br_val_1,_br_val_2,_br_val_3,_br_val_4", true, ".amido.com")
        expect(Cookies.set).not.toBeCalled()
        expect(Cookies.remove).not.toBeCalled()
    })

    it("Should set a new cookie if the Bloomreach cookie exists, index result is higher than bloomReachCachingCookieList length", () => {
        Cookies.get = jest.fn().mockImplementation(() => "test")
        Cookies.set = jest.fn().mockImplementation(() => "")
        Cookies.remove = jest.fn().mockImplementation()
        const _spy = jest
            .spyOn(global, "decodeURIComponent")
            .mockReturnValueOnce("te=15989732156984200011225544321554463200:test=123:test2=3:test4=5")

        setBloomreachCookie("_br_val_1,_br_val_2,_br_val_3,_br_val_4", true, ".amido.com")
        expect(Cookies.set).toBeCalledWith("_br_mt_search", "_br_val_1", {expires: 1, domain: ".amido.com"})
        expect(Cookies.remove).not.toBeCalled()
    })

    it("Should not set a new cookie if the Bloomreach cookie exists, but the decoded version is undefined, resulting in an error", () => {
        Cookies.get = jest.fn().mockImplementation(() => "test")
        Cookies.set = jest.fn().mockImplementation(() => "")
        Cookies.remove = jest.fn().mockImplementation()

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const _spy = jest.spyOn(global, "decodeURIComponent").mockReturnValueOnce(undefined)
        setBloomreachCookie("_br_val_1,_br_val_2,_br_val_3,_br_val_4", true, ".amido.com")
        expect(Cookies.set).not.toBeCalled()
        expect(Cookies.remove).not.toBeCalled()
    })

    it("Should remove the cookie if the Bloomreach cookie does not exist", () => {
        Cookies.get = jest.fn().mockImplementation(() => undefined)
        Cookies.set = jest.fn().mockImplementation(() => "")
        Cookies.remove = jest.fn().mockImplementation()
        setBloomreachCookie("_br_val_1,_br_val_2,_br_val_3,_br_val_4", true, ".amido.com")
        expect(Cookies.remove).toBeCalled()
    })
})
