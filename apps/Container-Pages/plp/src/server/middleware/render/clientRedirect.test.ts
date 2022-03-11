import ClientRedirect from "./clientRedirect"

const mockResponse = {
    redirect: jest.fn(),
}

describe("Given a ClientRedirect", () => {
    it("When redirecting to /clearance, it should call redirect with correct url", () => {
        ClientRedirect(mockResponse, "https://www.test.co.uk", {url: "/clearance", statusCode: 302})
        expect(mockResponse.redirect).toHaveBeenCalledWith(302, "https://www.test.co.uk/clearance")
    })

    it("When redirecting to clearance, it should call redirect with correct url", () => {
        ClientRedirect(mockResponse, "https://www.test.co.uk", {url: "clearance", statusCode: 302})
        expect(mockResponse.redirect).toHaveBeenCalledWith(302, "https://www.test.co.uk/clearance")
    })

    it("When redirecting to www.foo.com/help, it should call redirect with correct url", () => {
        ClientRedirect(mockResponse, "https://www.test.co.uk", {url: "www.foo.com/help", statusCode: 302})
        expect(mockResponse.redirect).toHaveBeenCalledWith(302, "https://www.foo.com/help")
    })

    it("When redirecting to www.foo.com/help on a http site url, it should call redirect with correct url", () => {
        ClientRedirect(mockResponse, "http://www.test.co.uk", {url: "www.test.com/help", statusCode: 302})
        expect(mockResponse.redirect).toHaveBeenCalledWith(302, "http://www.test.com/help")
    })

    it("When redirecting to foo.com/help on a http site url, it should call redirect with correct url", () => {
        ClientRedirect(mockResponse, "http://www.test.co.uk", {url: "https://foo.com/help", statusCode: 302})
        expect(mockResponse.redirect).toHaveBeenCalledWith(302, "https://foo.com/help")
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
})
