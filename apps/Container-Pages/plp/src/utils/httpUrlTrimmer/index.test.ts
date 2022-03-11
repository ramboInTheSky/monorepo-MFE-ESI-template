import { httpUrlTrimmer, urlSanitiser } from "."

jest.mock("../../config/env", ()=>({
  REACT_APP_SERVE_PATH_PREFIX: "/dev04"
}))

describe('Given a httpUrlTrimmer util', () => {
  it('should trim the url if it contains http', () => {
    const urlWithHttp = "http://test.co.uk"
    const res = httpUrlTrimmer(urlWithHttp)

    expect(res).toBe("test.co.uk")
  })
  it('should trim the url if it contains https', () => {
    const urlWithHttp = "https://test.co.uk"
    const res = httpUrlTrimmer(urlWithHttp)

    expect(res).toBe("test.co.uk")
  })
  it('should not trim the url if it does not contain https/', () => {
    const urlWithHttp = "test.co.uk"
    const res = httpUrlTrimmer(urlWithHttp)

    expect(res).toBe("test.co.uk")
  })
})

describe('Given a urlSanitiser util', () => {
  it('should trim the url if it contains /dev04', () => {
    const urlWithDev04 = "http://test.co.uk/dev04/shop"
    const res = urlSanitiser(urlWithDev04)

    expect(res).toBe("http://test.co.uk/shop")
  })
  it('should trim the url if it contains %2Fdev04', () => {
    const urlWithDev04 = "http%3A%2F%2Ftest.co.uk%2Fdev04%2Fshop"
    const res = urlSanitiser(urlWithDev04)

    expect(res).toBe("http%3A%2F%2Ftest.co.uk%2Fshop")
  })
})