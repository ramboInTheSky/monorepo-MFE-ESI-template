import {Theme} from "../src/theme"
import {ThemeColor} from "../src/themecolors"

export const mockColors: ThemeColor = {
    font: {
        primary: {
            regular: {
                family: '"AzoSansRegular"',
                filename: "AzoSans-Regular-webfont",
                formats: ["woff", "woff2"],
                weight: 700,
            },
            light: {
                family: '"AzoSans"',
                filename: "AzoSans-Light-webfont",
                formats: ["woff", "woff2", "eot"],
                weight: 400,
            },
            medium: {
                family: '"AzoSansMedium"',
                filename: "AzoSans-Medium-webfont",
                formats: ["woff", "woff2", "eot"],
                weight: 500,
            },
            italic: {
                family: '"AzoSansItalic"',
                filename: "AzoSans-Italic-webfont",
                formats: ["woff", "woff2", "eot"],
                weight: 400,
            },
        },
        secondary: {
            regular: {
                family: '"AzoSansRegular"',
                filename: "AzoSans-Regular-webfont",
                formats: ["woff", "woff2"],
                weight: 700,
            },
            light: {
                family: '"AzoSans"',
                filename: "AzoSans-Light-webfont",
                formats: ["woff", "woff2", "eot"],
                weight: 400,
            },
            medium: {
                family: '"AzoSansMedium"',
                filename: "AzoSans-Medium-webfont",
                formats: ["woff", "woff2", "eot"],
                weight: 500,
            },
            italic: {
                family: '"AzoSansItalic"',
                filename: "AzoSans-Italic-webfont",
                formats: ["woff", "woff2", "eot"],
                weight: 400,
            },
        },
        default: '"Helvetica Neue", Arial, sans-serif',
    },
    form: {
        buttonPrimary: {
            border: "0",
            background: "#30a74b",
            color: "#ffffff",
            radius: "0.25rem",
        },
        buttonSecondary: {
            border: ".0625rem solid #000000",
            background: "#ffffff",
            color: "#000000",
            radius: "0.25rem",
        },
        buttonTertiary: {
            border: "0",
            background: "#000000",
            color: "#ffffff",
            radius: "0.25rem",
        },
        input: {
            radius: "0.25rem",
            color: "#000",
            background: "#fff",
            border: "0.0625rem solid #eaeaea",
            placeholder: "#515151",
            focusActive: {
                background: "#ffffff",
            },
        },
        default: {
            border: ".0625rem solid #9e9e9e",
            background: "#ffffff",
            radius: "0.25rem",
        },
        disabled: {
            border: ".0625rem solid #dedede",
            background: "#ffffff",
            radius: "0.25rem",
        },
        focusActive: {
            border: ".0625rem solid #000000",
            background: "#ffffff",
            radius: "0.25rem",
        },
        invalid: {
            border: ".0625rem solid #d91440",
            background: "#ffffff",
            radius: "0.25rem",
        },
        selectedAccent: {
            border: ".125rem solid #257F39",
            background: "#ffffff",
            radius: "0.25rem",
        },
        selectedBlock: {
            border: ".125rem solid #257F39",
            background: "rgba(255, 226, 216, 0.39)",
            radius: "0.25rem",
        },
        success: {
            border: ".0625rem solid #109449",
            background: "#ffffff",
            radius: "0.25rem",
        },
    },
    text: {
        default: "#000000",
        disabled: "#c5c5c5",
        reversed: "#ffffff",
        error: "#d91440",
        hyperlink: "#257f39",
        muted: "#515151",
        strong: "#000000",
        success: "#257f39",
        warning: "#d88f31",
        navigation: {
            link: "#ffffff",
            linkActive: "#000000",
            linkClearance: "#f28500",
            fontWeight: 500,
        },
    },

    borders: {
        primary: {
            border: "0.0625rem solid #9e9e9e",
            radius: "0.125rem",
        },
        secondary: {
            border: "0.0625rem solid #9e9e9e",
            radius: "0.3125rem",
        },
    },

    palette: {
        modal: {
            backdrop: {
                primary: "0, 0, 0, 0.5",
                secondary: "0, 0, 0, 0.9",
            },
            background: {
                primary: "#ffffff",
                secondary: "#f7f7f7",
            },
        },
    },

    footer: {
        socialMedia: {
            background: "initial",
        },
        quickLinks: {
            background: "#f7f7f7",
        },
        mainLinks: {
            background: "#f7f7f7",
        },
        copyright: {
            background: "#f7f7f7",
        },
    },
    header: {
        navUpperBackground: {
            default: "#000000",
            color: "#ffffff",
        },
        navLowerBackground: {
            default: "#1e1e1e",
            desktop: "#000000",
            active: "#ffffff",
            border: "0",
        },
        shoppingBag: {
            color: "#fff",
            fontWeight: "bold",
            fontSize: "0.688rem",
        },
        myAccount: {
            background: "#fff",
            radius: "0.25rem",
        },
        autoCompleteButton: {
            backgroundcolor: "#282828",
            color: "white",
            radius: "2px",
        },
    },
    popover: {
        border: "0.0625rem solid #9e9e9e",
        radius: "0.25rem",
        backgroundColour: "#f7f7f7",
        fontSize: "0.75rem",
        boxShadow: "0px 3px 4px 1px rgba(0, 0, 0, 0.4)",
    },
    utilities: {
        divider: "0.0625rem solid #eaeaea",
        dividerDark: ".0625rem solid #9e9e9e",
        backgroundAccent: "#f7f7f7",
        activeBorder: "0.125rem solid #257f39",
        chipBorderRadius: "0.25rem",
    },

    drawer: {
        headerBackground: "#f7f7f7",
        headerBorder: ".0625rem solid #9e9e9e",
    },
    plp: {
        layout: {
            flexDirection: "initial",
            hasColourChips: "none",
            hasBrandName: "none",
        },
        listing: {
            textAlign: "left",
        },
        facetDivider: "0.0625rem solid #d1d1d1",
        filters: {
            titleTransform: "uppercase",
        },
    },

    countrySelect: {
        logoPosition: "flex-start",
        headerBarHeight: "2.75rem",
        headerBackground: "#000000",
        headerBorderBottom: "none",
        accordionHeaderTransform: "capitalize",
        accordionHeaderLetterSpacing: "0.0075rem",
    },
}

export const mockTheme: Theme = {styles: "", colours: mockColors, direction: "ltr"}
