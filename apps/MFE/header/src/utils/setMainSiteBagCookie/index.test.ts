/* eslint-disable @typescript-eslint/unbound-method */
import Cookies from "js-cookie"
import setMainSiteBagCookie, {mainSiteBagCookieName} from "."

const props = {
    data: {
        ShoppingBag: {
            ItemCount: 3,
            OrderGoodsValue: 34,
        },
    },
}
const cookieValue = `Quantity=${props.data.ShoppingBag.ItemCount}&TotalValue=${props.data.ShoppingBag.OrderGoodsValue}&SaleSiteRead=False`

jest.mock("js-cookie", () => ({
    ...jest.requireActual("js-cookie"),
    get: jest.fn(),
    set: jest.fn(),
}))

describe("Given a setMainSiteBagCookie util", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it("should set the cookie when itemCount is more than 0", () => {
        setMainSiteBagCookie(props)
        expect(Cookies.set).toBeCalledWith(mainSiteBagCookieName, cookieValue)
    })
    it("should set the cookie with expiry date when ItemCount is 0", () => {
        Cookies.set = jest.fn().mockImplementation(() => "MainSiteBag=ABC123")
        Cookies.get = jest.fn().mockImplementationOnce(() => "MainSiteBag=123345667")
        const newProps = {
            data: {
                ShoppingBag: {
                    ItemCount: 0,
                    OrderGoodsValue: 0,
                },
            },
        }
        setMainSiteBagCookie(newProps)
        expect(Cookies.set).toBeCalledWith(mainSiteBagCookieName, "MainSiteBag=123345667", {expires: 0})
    })
    it("should not set the cookie when ItemCount is 0", () => {
        Cookies.set = jest.fn().mockImplementation(() => "MainSiteBag=ABC123")
        const newProps = {
            data: {
                ShoppingBag: {
                    ItemCount: 0,
                    OrderGoodsValue: 0,
                },
            },
        }
        setMainSiteBagCookie(newProps)
        expect(Cookies.set).not.toBeCalled()
    })
})
