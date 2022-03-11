import fallbackSeo from "."

describe("fallbackSeo", () => {
    it("should call the required functions", () => {
        const res: any = {
            status: jest.fn(),
            set: jest.fn(),
            send: jest.fn(() => ({
                end: jest.fn(),
            })),
        }

        fallbackSeo(res)

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(res.status).toHaveBeenCalledWith(200)

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(res.set).toHaveBeenCalledWith({
            "x-monorepo-override-seo": "false",
            "Content-Length": 0,
            "Content-Type": "text/html",
        })
        expect(res.send).toHaveBeenCalled()
    })
})
