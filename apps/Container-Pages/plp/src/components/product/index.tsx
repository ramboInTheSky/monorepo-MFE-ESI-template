import React, {useEffect, useRef} from "react"
import {IS_BROWSER} from "../../utils/window"
import createProductSummaryEsiTag from "../../utils/createProductSummaryEsiTag"

export const productIdFor = (itemNumber: string) => `plp-product-summary-entrypoint-${itemNumber}`

const getExistingHtml = (selector: string) => {
    const element = document.getElementById(selector)
    return element ? element.innerHTML : null
}

interface ProductComponentProps {
    itemNumber: string
    newIn: boolean
    siteUrl: string
    useDevEsi: boolean
    itemType?: string
    html?: string
}

class Product extends React.Component<ProductComponentProps> {
    shouldComponentUpdate() {
        return false
    }

    render() {
        const {itemNumber, itemType, newIn, html, siteUrl, useDevEsi} = this.props

        if (!IS_BROWSER()) {
            const esiHtml = createProductSummaryEsiTag(itemNumber, newIn, siteUrl, useDevEsi, itemType)
            return <InjectedProduct html={esiHtml} itemNumber={itemNumber} />
        }

        if (html) {
            return <RenderProductFragment html={html} itemNumber={itemNumber} />
        }

        return <InjectedProduct html={getExistingHtml(productIdFor(itemNumber))} itemNumber={itemNumber} />
    }
}

interface InjectedProductProps {
    html?: string | null
    itemNumber: string
}

export const InjectedProduct = React.forwardRef<any, InjectedProductProps>((props, ref) => {
    const {html, itemNumber} = props
    const _props: any = {}

    if (html) {
        _props.dangerouslySetInnerHTML = {
            __html: html,
        }
    }

    return <div ref={ref} id={productIdFor(itemNumber)} key={itemNumber} data-pid={itemNumber} {..._props} />
})

InjectedProduct.displayName = "InjectedProduct"

interface RenderProductFragmentProps {
    html: string
    itemNumber: string
}

function RenderProductFragment({html, itemNumber}: RenderProductFragmentProps) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if (containerRef.current) {
            const fragment = document.createRange().createContextualFragment(html)
            containerRef.current.appendChild(fragment)
        }
    }, [html])

    return <InjectedProduct itemNumber={itemNumber} ref={containerRef} />
}

export default Product
