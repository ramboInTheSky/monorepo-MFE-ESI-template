import styled from "styled-components"
import Link from "@mui/material/Link"

enum CountrySelectorTypes {
    CountryLink = "CountryLink",
    CountryLanguage = "CountryLanguage",
}

export const CountrySelectorLanguageLink = styled(Link)`
    color: ${props => props.theme.colours.text.muted};
    font-size: 12px;
    letter-spacing: 0.3px;

    &:hover {
        text-decoration: underline;
    }

    + span {
        margin: 0 8px;
    }
`
export const CountrySelectorLanguageList = styled.li`
    span {
        font-size: 12px;
        color: ${props => props.theme.colours.text.muted};
    }
`

export const setLanguagesInElements = elements => {
    const countrySelectorList: any[] = []
    let languageList: any[] = []
    let index = 0

    elements.forEach((element: any, key: string) => {
        if (element.type === CountrySelectorTypes.CountryLink) {
            countrySelectorList.push(element)
            if (languageList.length >= 1) {
                countrySelectorList[index].languages = languageList
                index += 1
                languageList = []
            }
        }

        if (element.type === CountrySelectorTypes.CountryLanguage) {
            languageList.push(element)

            if (elements.length === key + 1) {
                countrySelectorList[index].languages = languageList
            }
        }
    })

    return countrySelectorList
}
