import jscookie from "js-cookie"

export const mainSiteBagCookieName = "MainSiteBag"

const setMainSiteBagCookie = ({data}: Record<string, any>) => {
    const {
        ShoppingBag: {ItemCount, OrderGoodsValue},
    } = data
    if (ItemCount > 0) {
        jscookie.set(mainSiteBagCookieName, `Quantity=${ItemCount}&TotalValue=${OrderGoodsValue}&SaleSiteRead=False`)
    } else {
        const mainSiteBagCookie = jscookie.get(mainSiteBagCookieName)
        if (mainSiteBagCookie) jscookie.set(mainSiteBagCookieName, mainSiteBagCookie, {expires: 0})
    }
}

export default setMainSiteBagCookie
