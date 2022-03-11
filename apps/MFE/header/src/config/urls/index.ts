import {formatCdnPath, formatCdnPathWithVariant} from "../../utils/getCdnUrl"

export default Object.freeze({
    searchBox: {
        searchIconUrl: (realm: string, variant): string => formatCdnPathWithVariant("search.svg", realm, variant),
        searchInputButtonUrl: (realm: string, variant): string =>
            formatCdnPathWithVariant("search-input-button.svg", realm, variant),
        clearButton: {
            path: formatCdnPath("/icons/shared/clear.svg"),
        },
    },
    myAccount: {
        loginUrl: "/secure/accounts/transfer",
        signoutUrl: "/forget-me",
        tooltipIconUrl: (realm: string, variant: string): string =>
            formatCdnPathWithVariant("account-tooltip.svg", realm, variant),
    },
    checkout: {
        url: "/secure/checkout/transfer/checkoutcta",
    },
    autoComplete: {
        images: {
            oldDirectoryName: "AltItemZoom",
            newDirectoryName: "search/224x336",
        },
    },
    drawer: {
        iconUrl: formatCdnPath("/icons/shared/amido_close-white.svg"),
    },
    favourites: {
        url: "/favourites",
        activeIconUrl: (realm: string, variant: string) =>
            formatCdnPathWithVariant("favourites-active.svg", realm, variant),
        inactiveIconUrl: (realm: string, variant: string) =>
            formatCdnPathWithVariant("favourites-inactive.svg", realm, variant),
    },
    shoppingBag: {
        iconUrl: (realm: string, variant: string) => formatCdnPathWithVariant("shopping-bag.svg", realm, variant),
        url: "/shoppingbag",
    },
    countryLangSelector: {
        countrySelectUrl: "/countryselect",
    },
    burgerMenu: {
        iconUrl: (realm: string, variant: string) => formatCdnPathWithVariant("menu.svg", realm, variant),
    },
    queueIt: {
        clientUrl: "//static.queue-it.net/script/queueclient.min.js",
        configLoader: "//static.queue-it.net/script/queueconfigloader.js",
    },
    abPlatformTesting: {
        configsPath: "/configs/abplatform/",
        baseFile: "abplatform.js",
        configFile: "abplatformconfig.js",
    },
})
