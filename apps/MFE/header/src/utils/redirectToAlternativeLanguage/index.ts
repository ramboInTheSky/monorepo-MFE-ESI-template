/* istanbul ignore file */

// TEMP CODE - To be removed after MVC deployed with 17101 changes
const subscribeRedirectToAlternativeLangeuage = () => {
    if (!(window as any).redirectToAlternateLanguage) {
        ;(window as any).redirectToAlternateLanguage = () => {
            ;(document.getElementsByClassName("altLanguageLink")[0] as HTMLElement).click()
        }
    }
}
export default subscribeRedirectToAlternativeLangeuage
