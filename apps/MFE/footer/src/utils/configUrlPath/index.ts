const configUrlPath = (url, siteUrl) => {
    const relativePath = "/"
    return url.charAt(0) === relativePath ? `${siteUrl}${url}` : url
}

export default configUrlPath
