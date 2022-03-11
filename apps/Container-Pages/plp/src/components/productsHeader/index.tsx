import React from "react"
import {DesktopHeaderContainer} from "./components"
import DesktopSort from "../desktopSort"
import ProductsTitle from "../productsTitle"

const ProductsHeader = () => {
    return (
        <DesktopHeaderContainer >
            <ProductsTitle />
            <DesktopSort />
        </DesktopHeaderContainer>
    )
}
export default ProductsHeader
