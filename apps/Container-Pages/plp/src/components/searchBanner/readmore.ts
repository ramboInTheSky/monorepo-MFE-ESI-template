export const setReadMoreListener = (buttonElement, handleClick) => {
    const contentElement = document.getElementById("search-banner-read-more-content")
    const readMoreClass = "readmore"
    const readMoreContentClass = "search-banner-read-more-content"

    if (contentElement) {
        contentElement.classList.remove(readMoreContentClass)
        contentElement.classList.add(readMoreClass)

        if (buttonElement) {
            const initialButtonDisplay = window.getComputedStyle(buttonElement).display
            const truncationCallback = () => checkTruncation(buttonElement, contentElement, initialButtonDisplay)

            buttonElement.removeEventListener("click", handleClick)
            buttonElement.addEventListener("click", handleClick)

            // // check if the content element was resized while open
            buttonElement.removeEventListener("click", truncationCallback)
            buttonElement.addEventListener("click", truncationCallback)

            // // check if the content element reflows on resize
            window.removeEventListener("resize", truncationCallback)
            window.addEventListener("resize", truncationCallback)
            truncationCallback()
        }

        return contentElement
    }
}

export const checkTruncation = (buttonElement, contentElement, initialButtonDisplay) => {
    const {clientHeight, scrollHeight} = contentElement
    const buttonState = buttonElement.getAttribute("data-openclose")

    // if scroll height > clientHeight, the copy is overflowing, and we need to see the button
    const isTruncated = clientHeight && scrollHeight && scrollHeight > clientHeight

    // 'open' means 'click to open', not 'is open'
    // content will never be truncated when the panel is open
    if (buttonState === "open") {
        /* eslint-disable-next-line no-param-reassign */
        buttonElement.style.display = isTruncated ? initialButtonDisplay : "none"
    }
}

export const setupReadMore = text => {
    const buttonElement = document.getElementById("search-banner-read-more")
    let readMoreElement

    const handleClick = () => {
        updateReadMore(buttonElement, readMoreElement, text)

        return true
    }

    readMoreElement = setReadMoreListener(buttonElement, handleClick)

    return {handleClick}
}

export const updateReadMore = (buttonElement, readMoreElement, text) => {
    const readMoreText = text.pages.searchBanners.readMore
    const readLessText = text.pages.searchBanners.readLess
    const readMoreClass = "readmore"
    const openCloseAttribute = "data-openclose"
    const openAttribute = "open"
    const closeAttribute = "close"

    if (buttonElement) {
        const openClose = buttonElement.getAttribute(openCloseAttribute)

        /* eslint-disable no-param-reassign */
        if (openClose === openAttribute) {
            buttonElement.innerText = readLessText
            readMoreElement.classList.remove(readMoreClass)
            buttonElement.setAttribute(openCloseAttribute, closeAttribute)
        } else if (openClose === closeAttribute) {
            buttonElement.innerText = readMoreText
            readMoreElement.classList.add(readMoreClass)
            buttonElement.setAttribute(openCloseAttribute, openAttribute)
        }
    }
}
