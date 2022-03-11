import {connect} from "react-redux"
import {REALM_HEADER} from "../../../config/constants"
import {State} from "../../../ducks"

export const mapStateToProps = (state: State) => ({
    currentLanguageText: state.languages.currentLanguageText,
    altLangaugeName: state.languages.altLanguageName,
    altLanguageUrl: state.languages.altLanguageUrl,
    currentLanguageName: state.languages.currentLanguageName,
    siteUrl: state.languages.siteUrl,
    variant: state.settings.variant,
    realm: state.request.headers![REALM_HEADER] as string,
})

export default connect(mapStateToProps)
