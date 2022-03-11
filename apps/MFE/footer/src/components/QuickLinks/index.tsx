import React, {Component} from "react"
import {GridSize} from "@mui/material"
import {formatTextTestIds} from "@monorepo/utils"
import {RegionModel, SubRegionElementModel} from "../../models/footerModel"
import {DefaultColumns} from "../../models/regions"
import getwindow from "../../utils/window"
import {UserDuckState, AccountStatusChanged} from "../../ducks/user"
import QuickLink from "./QuickLink"
import MyAccountQuickLink from "./MyAccountQuickLink"
import LogoutLinkComponent from "./LogoutQuickLink"
import LanguageSelectorQuickLink from "./LanguageSelectorQuickLink"
import {QuickLinksElementsTransformer, QuickLinkTypes} from "./utils"
import connect from "./connect"
import {QuickLinksWrapper, GridContainer} from "./components"
import executeOnLoad from "../../utils/window/executeOnLoad"

export interface QuickLinksProps {
    region: RegionModel
    accountStatusChanged: AccountStatusChanged
    user: UserDuckState
    showLangSelector: boolean
}

enum SupportedQuickLinksTypes {
    Logout = "Logout",
}

export class QuickLinks extends Component<QuickLinksProps> {
    window

    componentDidMount = () => {
        this.window = getwindow()
        this.userDataChanged()

        executeOnLoad(this.subscribeToAmidoBasket)
    }

    componentWillUnmount = () => {
        this.window.removeEventListener("load", this.subscribeToAmidoBasket)
    }

    subscribeToAmidoBasket = () => {
        this.userDataChanged()

        if (this.window.AmidoBasket) {
            this.window.AmidoBasket.RegisterChange(() => {
                this.userDataChanged()
            })
        }
    }

    userDataChanged = () => {
        const {AmidoBasket} = this.window
        let firstName
        if (AmidoBasket && AmidoBasket.Data && AmidoBasket.Data.FirstName) firstName = AmidoBasket.Data.FirstName
        if (firstName !== this.props.user.accountFirstName) this.props.accountStatusChanged(firstName)
    }

    renderDefaultQuickLinks = (elements: SubRegionElementModel[]) => {
        const condensedElements = QuickLinksElementsTransformer(elements)
        let mdcolumns = 6
        const languageSelectorElement = condensedElements?.find(
            element => element.type === QuickLinkTypes.LanguageSelector,
        )
        const islanguageselectorpresent = !!languageSelectorElement
        if (islanguageselectorpresent) {
            mdcolumns = 6
        }
        const numberOfStandardLinks = condensedElements?.filter(
            element => element.type === QuickLinkTypes.Standard || element.type === QuickLinkTypes.MyAccount,
        )

        return condensedElements?.map((quickLink: any) => {
            const {url, text, accessibilityText, type} = quickLink

            if (
                (type !== QuickLinkTypes.MyAccount &&
                    type !== QuickLinkTypes.LanguageSelector &&
                    (!text || !url || !accessibilityText)) ||
                (quickLink.type === QuickLinkTypes.LanguageSelector && !this.props.showLangSelector)
            ) {
                return null
            }

            const columnStandardLength: GridSize =
                numberOfStandardLinks && Object.keys(numberOfStandardLinks).length === 1 ? 6 : 3

            const columns = {
                sm: 12,
                md: mdcolumns,
                lg: type === QuickLinkTypes.LanguageSelector ? 5 : columnStandardLength,
            }

            return (
                <QuickLinksWrapper
                    data-testid={formatTextTestIds(`footer-quicklinks-${type}-${text}`)}
                    key={`${type}-${text}`}
                    item
                    xs={DefaultColumns.xs}
                    sm={columns.sm as GridSize}
                    md={columns.md as GridSize}
                    lg={columns.lg as GridSize}
                    className="quicklink__wrapper"
                >
                    {quickLink.type === QuickLinkTypes.MyAccount && <MyAccountQuickLink {...quickLink} />}
                    {quickLink.type === QuickLinkTypes.LanguageSelector && (
                        <LanguageSelectorQuickLink data={quickLink} />
                    )}
                    {quickLink.type === QuickLinkTypes.Standard && <QuickLink data={quickLink} />}
                </QuickLinksWrapper>
            )
        })
    }

    render() {
        const {subRegions} = this.props.region
        let key = 0
        return (
            <>
                {subRegions.map(subregion => {
                    const currentKey = key
                    key += subregion.elements.length
                    switch (subregion.title) {
                        case SupportedQuickLinksTypes.Logout:
                            return (
                                <GridContainer key={`${subregion.title}-${key}`} item container xs={DefaultColumns.xs}>
                                    <LogoutLinkComponent elements={subregion.elements} key={currentKey} />
                                </GridContainer>
                            )
                        case "":
                            return (
                                <GridContainer key={`${subregion.title}-${key}`} item container xs={DefaultColumns.xs}>
                                    {this.renderDefaultQuickLinks(subregion.elements)}
                                </GridContainer>
                            )
                        default:
                            return null
                    }
                })}
            </>
        )
    }
}

export default connect(QuickLinks)
