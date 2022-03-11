import React, {useEffect, useRef} from "react"
import {formatTextTestIds} from "@monorepo/utils"
import {Arrow, Container, Title} from "./component"
import {PrimaryNavItem} from "../../models/primary-nav"
import connect from "./connect"
import {SELECTED_DEPARTMENT_DETAILS, NAV_BAR} from "../../config/constants"

export type Data = {index: number; item: {title: string; path: string}}

export type SnailItemProps = PrimaryNavItem & {
    isActive: boolean
    index: number
    path: string
    handleClick: (event: React.MouseEvent, ref: React.RefObject<HTMLLIElement>, data: Data) => void
    handleMouseEnter: (event: React.MouseEvent, ref: React.RefObject<HTMLLIElement>, data: Data) => void
    handleKeyboardEnter: (event: React.KeyboardEvent, ref: React.RefObject<HTMLLIElement>, data: Data) => void
    scrollToPosition: (num: number) => void
    siteUrl: string
    classNames: string
    total: number
    showSecondaryNavArrow: boolean
}

export const SnailItem = ({
    index,
    isActive,
    target,
    title,
    path,
    handleClick,
    handleMouseEnter,
    handleKeyboardEnter,
    scrollToPosition,
    linkColour,
    fontFamily,
    fontWeight,
    siteUrl,
    classNames,
    total,
    showSecondaryNavArrow,
}: SnailItemProps) => {
    const ref = React.useRef<HTMLLIElement>(null)
    const linkRef = React.useRef<HTMLAnchorElement>(null)
    useEffect(() => {
        const getSelectedDepartmentDetails = localStorage.getItem(SELECTED_DEPARTMENT_DETAILS)
        if (getSelectedDepartmentDetails && index === total - 1) {
            if (JSON.parse(getSelectedDepartmentDetails).dept.toLowerCase() === title.toLowerCase()) {
                const rec = ref?.current?.getBoundingClientRect()
                if (rec) {
                    return scrollToPosition(rec.x)
                }
            }
        }
    }, [index, scrollToPosition, title, total])

    // Return focus to primary nav when secondary nav closes
    const hasBeenActiveRef = useRef(false)
    useEffect(() => {
        if (isActive && linkRef.current) {
            hasBeenActiveRef.current = true
        } else {
            if (hasBeenActiveRef.current && linkRef.current) {
                linkRef.current.focus()
            }
            hasBeenActiveRef.current = false
        }
    }, [isActive])

    const hijackMouseEnter = (event: React.MouseEvent): void => {
        handleMouseEnter(event, ref, {item: {path, title}, index})
    }
    const hijackClick = (event: React.MouseEvent): void => {
        handleClick(event, ref, {item: {path, title}, index})
    }

    const hijackKeyEnter = (event: React.KeyboardEvent): void => {
        handleKeyboardEnter(event, ref, {item: {path, title}, index})
    }

    const marketingStyles = {
        linkColour,
        fontFamily,
        fontWeight,
    }

    const linkProps = {
        "data-ga-v1": NAV_BAR,
        "data-ga-v2": title,
    }

    return (
        <Container
            ref={ref}
            isActive={isActive}
            onClick={hijackClick}
            onMouseEnter={hijackMouseEnter}
            marketingStyles={marketingStyles}
            data-testid={formatTextTestIds(`meganav-primarynav-link-${title}`)}
            className={classNames}
            data-index={index}
        >
            <a
                ref={linkRef}
                onKeyDown={hijackKeyEnter}
                href={`${siteUrl}${target}`}
                title={title}
                {...linkProps}
                id={`meganav-link-${index}`}
            >
                <Title isActive={isActive} marketingStyles={marketingStyles}>
                    {title}
                </Title>
                {showSecondaryNavArrow && <Arrow />}
            </a>
        </Container>
    )
}

export default connect(SnailItem)
