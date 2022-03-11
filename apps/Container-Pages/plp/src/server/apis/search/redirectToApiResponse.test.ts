import redirectToResponseUrl from "./redirectToApiResponse"

const mockResponse = {
    send: jest.fn(),
}

describe("Given a redirectToResponseUrl", () => {
    describe("When redirecting", () => {
        it("should call send", () => {
            const mockData = {redirectUrl: "test"}
            redirectToResponseUrl(mockData, mockResponse)

            expect(mockResponse.send).toHaveBeenCalledWith({
                statusCode: 301,
                url: "test",
            })
        })
    })
})
