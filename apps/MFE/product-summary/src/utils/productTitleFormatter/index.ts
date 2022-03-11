const format = (title: string) => {
    return title.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())
}

export default format
