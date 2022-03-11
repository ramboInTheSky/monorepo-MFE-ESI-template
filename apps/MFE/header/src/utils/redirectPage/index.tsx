import PublishCountrySelectorRedirect from "../../events/countrySelectorRedirect"

const redirectPage = (selectedCountry, selectedLanguage) => {
    PublishCountrySelectorRedirect()

    const selectedLang = selectedCountry?.Languages.find(l => l.Name === selectedLanguage)
    if (selectedLang) {
        window.location.href = selectedLang.TargetUrl
    }
}

export default redirectPage
