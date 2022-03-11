import React from "react"
import {breakpoints} from "@monorepo/themes"
import {useMediaQuery} from "@mui/material"
import {Swiper, SwiperSlide} from "swiper/react"
import SwiperCore, {Navigation} from "swiper/core"

import {TextModel} from "models/Text"
import connect from "./connect"
import CategoryQuickLink from "../categoryQuickLink"
import {CategoryQuickLinkItem} from "../../ducks/categoryQuickLinks/types"
import {CategoryQuickLinkItems, CategoryQuickLinksRoot, CategoryQuickLinksTitle} from "./components"
import {SWIPER_ITEMS_PER_PAGE} from "../../config/constants"

import "swiper/swiper.min.css"
import "swiper/components/navigation/navigation.min.css"

SwiperCore.use([Navigation])

interface CategoryQuickLinksProps {
    items: CategoryQuickLinkItem[]
    text: TextModel
}

export function CategoryQuickLinks({items, text}: CategoryQuickLinksProps) {
    const isMedium = useMediaQuery(`(min-width: ${breakpoints.values.md}px)`)
    const spaceBetween = isMedium ? 32 : 16
    if (!items.length) return null

    return (
        <CategoryQuickLinksRoot data-testid="plp-category-quick-links">
            <CategoryQuickLinksTitle>{text.labels.shopNow}</CategoryQuickLinksTitle>
            <CategoryQuickLinkItems>
                <Swiper
                    spaceBetween={spaceBetween}
                    slidesPerView="auto"
                    watchOverflow
                    // sometimes the navigation renders incorrectly before the layout is calculated
                    navigation={items.length > SWIPER_ITEMS_PER_PAGE}
                >
                    {items.map(quickLink => (
                        <SwiperSlide key={quickLink.href}>
                            <CategoryQuickLink {...quickLink} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </CategoryQuickLinkItems>
        </CategoryQuickLinksRoot>
    )
}

export default connect(CategoryQuickLinks)
