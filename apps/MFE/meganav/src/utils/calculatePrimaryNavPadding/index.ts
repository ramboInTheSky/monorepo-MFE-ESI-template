import isTouchDevice from "../is-touch-device"

declare let window: any
declare let document: any

export function calcPrimaryNavLinkMetrics() {
    const primaryNavLinkMetrics: any = []
    const snailTrailElement = document.getElementById("snail-trail-container")
    const meganavElement = document.getElementById("meganav-entrypoint")
    const childrenArray = snailTrailElement.children

    if (document.documentElement.clientWidth > 1024) {
        meganavElement.style.setProperty("--padding", "0px")
        return
    }

    let runningWidth = 0
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < childrenArray.length; i++) {
        const $link = childrenArray[i]
        const text = $link.textContent
        const textWidth = ($link.childNodes[0] as HTMLElement).clientWidth

        const textStartAt = runningWidth
        const textEndAt = runningWidth + textWidth

        let noChangeFrom = textStartAt + textWidth * 0.4
        let noChangeTo = textEndAt - textWidth * 0.3
        if (noChangeFrom >= noChangeTo) {
            // This can happen with shorter dept names such as "Men" and "Sale", just use the mid-point instead
            noChangeFrom = textStartAt + textWidth / 2
            noChangeTo = textStartAt + textWidth / 2
        }

        runningWidth += textWidth

        primaryNavLinkMetrics.push({
            $link,
            text,
            textWidth,
            textStartAt,
            textEndAt,
            noChangeFrom,
            noChangeTo,
        })
    }
    updatePrimaryNavLinkSpacing(primaryNavLinkMetrics, meganavElement)
}

export function updatePrimaryNavLinkSpacing(primaryNavLinkMetrics, snailTrailElement) {
    const screenWidth = document.getElementById("snail-trail-container").clientWidth
    let newMargin = 0
    let increaseMarginBy = 0
    let distributeOver = 0
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < primaryNavLinkMetrics.length; i++) {
        const link = primaryNavLinkMetrics[i]
        if (link.textEndAt < screenWidth) {
            // This link plus including default margins is completely contained within the view

            // Last links should distribute the remaining available space over all links
            if (i === primaryNavLinkMetrics.length - 1) {
                increaseMarginBy = screenWidth - link.textEndAt
                distributeOver = primaryNavLinkMetrics.length * 2
                newMargin = increaseMarginBy / distributeOver
                break
            }
            // Continue and find the first link that extends beyond the screen bounds
            // eslint-disable-next-line no-continue
            continue
        }

        // This is the first link that extends beyond the screens bounds
        if (screenWidth < link.noChangeFrom) {
            // If screen boundry is too near to the start of the link (we need at least a few chars trailing off the scree) then we much use the previous link instead
            if (i > 0) {
                // increase margins using the previous link such that the previous link is positioned with the last few characters trailing off the screen
                const prevLink = primaryNavLinkMetrics[i - 1]

                increaseMarginBy = screenWidth - prevLink.noChangeTo
                distributeOver = i * 2 - 1
                newMargin = increaseMarginBy / distributeOver
            } else {
                // No previous link to break on, fallback to default margin
                newMargin = 0
            }
        } else if (screenWidth > link.noChangeTo) {
            // If screen boundry is nearer to the end of the link
            increaseMarginBy = screenWidth - link.noChangeTo // increase margins such that the link is positioned with the last few characters trailing off the screen
            distributeOver = i * 2 + 1
            newMargin = increaseMarginBy / distributeOver
        } else {
            // Use default margin as we are somewhere in the middle of the link, ie. not close enough to the start or end to think about increasing margins
            newMargin = 0
        }
        // And we're done, no need to consider other links outside the screen bounds
        break
    }

    if (newMargin !== 0) {
        // eslint-disable-next-line operator-assignment
        newMargin = newMargin - 0.1 // Apply a slight fudge to ensure that we don't start scrolling unnecessarily
        // eslint-disable-next-line prefer-template,  radix
        newMargin = parseInt("" + newMargin * 10) / 10 // Round value
    }

    // eslint-disable-next-line prefer-template
    snailTrailElement.style.setProperty("--padding", newMargin.toFixed(2).toString() + "px")
    document.getElementById("meganav-entrypoint").style.setProperty("--display-primary-nav", "1")
}

function initialiseCalculatePadding() {
    if (!isTouchDevice() || document.documentElement.clientWidth > 1024) {
        document.getElementById("meganav-entrypoint").style.setProperty("--display-primary-nav", "1")
    } else {
        // eslint-disable-next-line  no-lonely-if
        if (document.fonts !== undefined) {
            document.fonts
                .load('1rem "AzoSansRegular"')
                .then(calcPrimaryNavLinkMetrics)
                .catch(calcPrimaryNavLinkMetrics)
        } else {
            calcPrimaryNavLinkMetrics()
        }
    }
}

export const toString = () => {
    const init = {
        init: initialiseCalculatePadding.name,
    }
    return `
            ${isTouchDevice.toString()}
            ${calcPrimaryNavLinkMetrics.toString()}
            ${updatePrimaryNavLinkSpacing.toString()}
            ${initialiseCalculatePadding.toString()}
           
            var platmodMeganavInitObj = ${JSON.stringify(init)};
            var fn = window[platmodMeganavInitObj.init];
            if (typeof fn === "function") fn();
`
}
