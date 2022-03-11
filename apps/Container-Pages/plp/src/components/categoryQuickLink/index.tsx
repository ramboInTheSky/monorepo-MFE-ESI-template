import React from "react"
import {breakpoints} from "@monorepo/themes"
import {useMediaQuery} from "@mui/material"

import {
    CategoryQuickLinkRoot,
    CategoryQuickLinkImage,
    CategoryQuickLinkTitle,
    CategoryQuickLinkDescription,
    CategoryQuickLinkImageContainer,
} from "./components"

interface CategoryQuickLinkProps {
    href: string
    title: string
    description: string
    imageSrc: string
    imageAlt: string
}

function CategoryQuickLink({href, title, description, imageSrc, imageAlt}: CategoryQuickLinkProps) {
    const isMedium = useMediaQuery(`(min-width: ${breakpoints.values.md}px)`)

    return (
        <CategoryQuickLinkRoot href={href} data-testid="plp-category-quick-link-item">
            <CategoryQuickLinkImageContainer>
                <CategoryQuickLinkImage
                    src={imageSrc}
                    alt={imageAlt}
                    data-testid="plp-category-quick-link-item-image"
                />
            </CategoryQuickLinkImageContainer>
            <CategoryQuickLinkTitle data-testid="plp-category-quick-link-item-title">{title}</CategoryQuickLinkTitle>
            {isMedium && (
                <CategoryQuickLinkDescription data-testid="plp-category-quick-link-item-description">
                    {description}
                </CategoryQuickLinkDescription>
            )}
        </CategoryQuickLinkRoot>
    )
}

export default CategoryQuickLink
