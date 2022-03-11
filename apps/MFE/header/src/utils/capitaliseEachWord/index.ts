export const capitaliseEachWord = (text: string): string => {
    const words = text.trim().split(" ")
    for (let i = 0; i < words.length; i += 1) {
        if (words[i][0]) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1)
        }
    }

    return words.join(" ")
}
