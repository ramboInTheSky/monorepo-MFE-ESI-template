export const replaceText = (string: string, replaceValue: string, regex: RegExp) => string.replace(regex, replaceValue)

export const formatTextTestIds = (string: string) => {
    const regex = / /gi
    const replaceValue = "-"
    return string.replace(regex, replaceValue).toLocaleLowerCase()
}
