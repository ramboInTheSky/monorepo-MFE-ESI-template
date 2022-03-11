export const removeWebpackGeneratedScripts = html => {
    const firstPart = html.substring(0, html.indexOf("<script src="))
    const lastPart = html.substring(html.lastIndexOf("</script>") + 9)
    return firstPart + lastPart
}

export const removeWebpackGeneratedCSS = html => {
    const firstPart = html.substring(0, html.indexOf("<link href="))
    const lastPart = html.substring(html.indexOf("</head>"))
    return firstPart + lastPart
}
