
export const getCookieValue = (cookieName, cookieList) => {
    const b = cookieList.match(`\\b${cookieName}=([^;]*)\\b`)
    return b ? b.pop() : ""
}

