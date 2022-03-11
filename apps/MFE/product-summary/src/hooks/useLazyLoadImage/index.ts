import {useSelector} from "react-redux"

import env from "../../config/env"
import {
    COLOURCHIP_GREY_PLACEHOLDER_URL,
    LAZY_SIZES_CLASSNAME,
    PRODUCT_IMAGE_GREY_PLACEHOLDER_URL,
} from "../../config/constants"
import {selectColourChipsLazyLoadEnabled, selectProductLazyLoadEnabled} from "../../ducks/lazyload"
import {useIsOnClient} from "../useIsOnClient"

interface UseLazyLoadImage {
    imageProps:
        | {
              src: string
              "data-src": string
              className: string
          }
        | {
              src: string
          }
}

export function useColourChipsLazyLoadImage(imageUrl: string, altText: string): UseLazyLoadImage {
    const isLazyLoadEnabled = useSelector(selectColourChipsLazyLoadEnabled)

    const imageProps = isLazyLoadEnabled
        ? {
              alt: altText,
              "data-src": imageUrl,
              src: `${env.REACT_APP_CDN_BASEURL}${COLOURCHIP_GREY_PLACEHOLDER_URL}`,
              className: LAZY_SIZES_CLASSNAME,
          }
        : {
              src: imageUrl,
          }

    return {
        imageProps,
    }
}

export function useProductLazyLoadImage(imageUrl: string): any {
    const isLazyLoadEnabled = useSelector(selectProductLazyLoadEnabled)
    const {isOnClient} = useIsOnClient()

    const imageProps =
        isOnClient && isLazyLoadEnabled
            ? {
                  "data-src": imageUrl,
                  src: `${env.REACT_APP_CDN_BASEURL}${PRODUCT_IMAGE_GREY_PLACEHOLDER_URL}`,
                  className: LAZY_SIZES_CLASSNAME,
              }
            : {
                  src: imageUrl,
              }
    return {
        imageProps,
    }
}
