import React, {useRef, useState, useEffect} from "react"
import Hidden from "@mui/material/Hidden"
import ToolTip from "@monorepo/tooltip"
import {
    useShoppingBagGetCallbackObservable,
    useShoppingBagAddCallbackObservable,
    useShoppingBagAddCistCallbackObservable,
    useShoppingBagAddEVoucherCallbackObservable,
    useShoppingBagAddLinkedItemCallbackObservable,
    useShoppingBagAddMultipleCallbackObservable,
    useShoppingBagAddWarrantyCallbackObservable,
    useShoppingBagRemoveCallbackObservable,
    useShoppingBagUpdateSizeCallbackObservable,
    useShoppingBagUpdateQuantityCallbackObservable,
    useModalsCloseObservable,
} from "@monorepo/eventservice"
import {ShoppingBag as ShoppingBagType} from "models/shoppingbag"
import {PublishToModalsClosed} from "../../events/modalsClosed"
import {HEADER_NAV_BAR_QUICK_LINKS, HEADER_NAV_BAR_QUICK_LINKS_SHOPPING_BAG} from "../../config/constants"
import connect from "./connect"
import {ShoppingBagLink, ToolTipContent} from "./components"
import MiniShoppingBag from "../MiniShoppingBag"
import ShoppingBagNotification from "../ShoppingBagNotification"
import {removeFromLocalStorage} from "../../utils/removeFromLocalStorage"

type ShoppingBagProps = {
    miniBagTooltipPlacement: any
    altText: string
    iconUrl: string
    itemCount: number
    updateShoppingBag: (data: any) => void
    addEVoucherToBag: (data: any) => void
    isBagLoading: boolean
    shoppingBagUrl
}

export const ShoppingBag = ({
    miniBagTooltipPlacement = "bottom",
    altText,
    iconUrl,
    itemCount,
    updateShoppingBag,
    addEVoucherToBag,
    isBagLoading,
    shoppingBagUrl,
}: ShoppingBagProps) => {
    const [isBagVisible, setIsBagVisible] = useState(false)
    const [shouldShowbagNotification, setShouldShowbagNotification] = useState(false)

    const openBag = () => {
        if (!isBagVisible) setIsBagVisible(true)
    }

    const handleShowMinibagNotification = ({data}) => {
        if (!data?.ShoppingBag) return

        const {RecreatedFromPreviousSession, UserNotifiedOfSessionRecreation, Authenticated, ItemCount} =
            data.ShoppingBag as ShoppingBagType

        if (RecreatedFromPreviousSession && !UserNotifiedOfSessionRecreation && Authenticated && ItemCount)
            setShouldShowbagNotification(true)
    }

    useShoppingBagGetCallbackObservable(data => {
        updateShoppingBag(data)
        handleShowMinibagNotification(data)
    })
    useShoppingBagAddCallbackObservable(data => {
        updateShoppingBag(data)
        openBag()
    })
    useShoppingBagAddCistCallbackObservable(data => {
        updateShoppingBag(data)
        openBag()
    })

    useShoppingBagAddEVoucherCallbackObservable(data => {
        addEVoucherToBag(data)
        openBag()
    })
    useShoppingBagAddLinkedItemCallbackObservable(data => {
        updateShoppingBag(data)
        openBag()
    })
    useShoppingBagAddMultipleCallbackObservable(data => {
        updateShoppingBag(data)
        openBag()
    })
    useShoppingBagAddWarrantyCallbackObservable(data => {
        updateShoppingBag(data)
    })
    useShoppingBagRemoveCallbackObservable(data => {
        updateShoppingBag(data)
    })
    useShoppingBagUpdateSizeCallbackObservable(data => {
        updateShoppingBag(data)
    })
    useShoppingBagUpdateQuantityCallbackObservable(data => {
        updateShoppingBag(data)
    })

    useModalsCloseObservable(() => {
        setIsBagVisible(false)
    })

    const handleOpen = event => {
        PublishToModalsClosed()
        event.preventDefault()
        setIsBagVisible(true)
        setShouldShowbagNotification(false)
    }

    const handleClose = event => {
        if (event) event.preventDefault()
        if (event?.type === "scroll" && event?.target !== document) return
        setIsBagVisible(false)
    }

    useEffect(() => {
        window.addEventListener("scroll", handleClose, true)
        return () => {
            window.removeEventListener("scroll", handleClose)
        }
    }, [])

    const thisElement = useRef(null)
    const items = isBagLoading ? "" : itemCount
    return (
        <div className="shoppingbag" data-testid="header-shopping-bag" ref={thisElement}>
            <Hidden mdUp implementation="css">
                <ShoppingBagLink onClick={removeFromLocalStorage} data-testid="header-shopping-bag-link-el">
                    <a
                        href={shoppingBagUrl}
                        data-ga-v1={HEADER_NAV_BAR_QUICK_LINKS}
                        data-ga-v2={HEADER_NAV_BAR_QUICK_LINKS_SHOPPING_BAG}
                        rel="nofollow"
                    >
                        <img src={iconUrl} alt={altText} />
                        <i>{items}</i>
                    </a>
                </ShoppingBagLink>
            </Hidden>
            <Hidden smDown implementation="css">
                <ShoppingBagLink onClick={handleOpen} data-testid="shopping-bag-link-button">
                    <button
                        type="button"
                        onClick={handleOpen}
                        data-ga-v1={HEADER_NAV_BAR_QUICK_LINKS}
                        data-ga-v2={HEADER_NAV_BAR_QUICK_LINKS_SHOPPING_BAG}
                    >
                        <img src={iconUrl} alt={altText} />
                        <i>{items}</i>
                    </button>
                </ShoppingBagLink>

                <ToolTip
                    open={isBagVisible}
                    anchorEl={thisElement.current}
                    handleClose={handleClose}
                    timeout={10000}
                    placement={miniBagTooltipPlacement}
                    animationTimeout={300}
                    enableModArrow
                >
                    <ToolTipContent>
                        <MiniShoppingBag />
                    </ToolTipContent>
                </ToolTip>
            </Hidden>

            <ToolTip
                open={shouldShowbagNotification}
                anchorEl={thisElement.current}
                handleClose={() => setShouldShowbagNotification(false)}
                timeout={10000}
                placement="bottom-end"
                enableModArrow
            >
                <ToolTipContent>
                    <ShoppingBagNotification />
                </ToolTipContent>
            </ToolTip>
        </div>
    )
}

export default connect(ShoppingBag)
