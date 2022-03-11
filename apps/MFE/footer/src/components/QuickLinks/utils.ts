import {SubRegionElementModel} from "../../models/footerModel"

interface MyAccountSubRegionElementModel {
    type: string
    loggedIn: SubRegionElementModel | null
    loggedOut: SubRegionElementModel | null
}

interface LanguageSelectorSubRegionElementModel {
    type: string
}

type QuickLinksElementModel =
    | MyAccountSubRegionElementModel
    | SubRegionElementModel
    | LanguageSelectorSubRegionElementModel

export enum QuickLinkTypes {
    MyAccount = "MyAccount",
    LanguageSelector = "LanguageSelector",
    Standard = "Link",
}

export const QuickLinksElementsTransformer = (
    elements: SubRegionElementModel[] | null,
): QuickLinksElementModel[] | null => {
    if (!elements) return null
    let index = 0
    const condensedElements: QuickLinksElementModel[] = []
    const myAccountElement: QuickLinksElementModel = {
        type: QuickLinkTypes.MyAccount,
        loggedIn: null,
        loggedOut: null,
    }

    elements.forEach(el => {
        if (el.type === "MyAccountLoggedIn") {
            myAccountElement.loggedIn = el
            if (myAccountElement.loggedOut) condensedElements.push(myAccountElement)
        } else if (el.type === "MyAccountLoggedOut") {
            myAccountElement.loggedOut = el
            if (myAccountElement.loggedIn) condensedElements.push(myAccountElement)
        } else if (el.type === QuickLinkTypes.LanguageSelector) {
            index += quickLinkColumnTotal.LanguageSelector
            if (index <= maxElements) condensedElements.push(el)
        } else {
            index += quickLinkColumnTotal.Link
            if (index <= maxElements) condensedElements.push(el)
        }
    })

    return condensedElements
}

export const quickLinkColumnTotal = {
    Link: 1,
    LanguageSelector: 2,
}

export const maxElements = 3
