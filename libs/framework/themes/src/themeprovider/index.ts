import {createTheme, Direction} from "@mui/material"
import {ThemeColor} from "../themecolors"
import {breakpoints} from "../breakpoints"

export const amidoMaterialUITheme = (theme: ThemeColor, textAlignment: Direction) =>
    createTheme({
        direction: textAlignment,
        breakpoints,
        typography: {
            fontFamily: `${theme.font.primary.regular.family}, ${theme.font.default}`,
            h1: {
                fontFamily: `${theme.font.primary.medium.family}, ${theme.font.default}`,
                color: theme.text.default,
                fontSize: "1.5rem",
                letterSpacing: "0.12px",
                lineHeight: 1.5,
                fontWeight: theme.font.primary.medium.weight,
            },
            h2: {
                fontFamily: `${theme.font.primary.medium.family}, ${theme.font.default}`,
                color: theme.text.default,
                fontSize: "1.25rem",
                letterSpacing: "0.12px",
                lineHeight: 1.5,
                fontWeight: theme.font.primary.medium.weight,
            },
            h3: {
                fontFamily: `${theme.font.primary.medium.family}, ${theme.font.default}`,
                color: theme.text.default,
                fontSize: "1rem",
                letterSpacing: "0.12px",
                lineHeight: 1.5,
                fontWeight: theme.font.primary.medium.weight,
            },
            h4: {
                fontFamily: `${theme.font.primary.medium.family}, ${theme.font.default}`,
                color: theme.text.default,
                fontSize: "0.938rem",
                lineHeight: 1.5,
                letterSpacing: "0.12px",
                fontWeight: theme.font.primary.medium.weight,
            },
            h5: {
                fontFamily: `${theme.font.primary.medium.family}, ${theme.font.default}`,
                color: theme.text.default,
                fontSize: "0.875rem",
                letterSpacing: "0.12px",
                lineHeight: 1.5,
                fontWeight: theme.font.primary.medium.weight,
            },
            h6: {
                fontFamily: `${theme.font.primary.medium.family}, ${theme.font.default}`,
                color: theme.text.default,
                fontSize: "0.75rem",
                lineHeight: 1.5,
                letterSpacing: "0.12px",
                fontWeight: theme.font.primary.medium.weight,
            },
            subtitle1: {
                color: theme.text.default,
                fontSize: "0.875rem",
                lineHeight: 1.5,
                letterSpacing: "0.12px",
            },
            subtitle2: {
                color: theme.text.default,
                fontSize: "0.875rem",
                lineHeight: 1.5,
                letterSpacing: "0.12px",
            },
            body1: {
                color: theme.text.default,
                fontSize: "0.875rem",
                lineHeight: 1.5,
                letterSpacing: "0.12px",
            },
            body2: {
                color: theme.text.default,
                fontSize: "0.75rem",
                lineHeight: 1.5,
                letterSpacing: "0.12px",
            },
        },
        palette: {
            primary: {
                main: theme.text.default,
            },
            secondary: {
                main: theme.text.reversed,
            },
            error: {
                main: theme.text.error,
            },
            warning: {
                main: theme.text.warning,
            },
            success: {
                main: theme.text.success,
            },
            action: {
                disabledOpacity: 0.5,
            },
        },
        components: {
            MuiTypography: {
                defaultProps: {
                    variantMapping: {
                        h1: "h1",
                        h2: "h1",
                        h3: "h1",
                        h4: "h2",
                        h5: "h3",
                        h6: "h4",
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        fontFamily: `${theme.font.primary.medium.family}, ${theme.font.default}`,
                        textTransform: "none",
                        fontSize: "0.875rem",
                        lineHeight: 1.5,
                        letterSpacing: "0.12px",
                        fontWeight: theme.font.primary.medium.weight,
                        background: theme.form.buttonPrimary.background,
                        color: theme.form.buttonPrimary.color,
                        borderRadius: theme.form.buttonPrimary.radius,
                        border: theme.form.buttonPrimary.border,
                        "&:focus": {
                            border: theme.form.focusActive.border,
                            background: theme.form.focusActive.background,
                            borderRadius: theme.form.focusActive.radius,
                        },
                        "&:active": {
                            border: theme.form.selectedBlock.border,
                            background: theme.form.selectedBlock.background,
                            borderRadius: theme.form.selectedBlock.radius,
                        },
                        "&:disabled": {
                            border: theme.form.disabled.border,
                            background: theme.form.disabled.background,
                            borderRadius: theme.form.disabled.radius,
                        },
                    },
                },
            },
            MuiAccordion: {
                styleOverrides: {
                    root: {
                        backgroundColor: theme.utilities.backgroundAccent,
                    },
                },
            },
            MuiListItem: {
                styleOverrides: {
                    root: {
                        "&$selected": {backgroundColor: theme.utilities.backgroundAccent},
                        "&$selected:hover": {backgroundColor: theme.utilities.backgroundAccent},
                    },
                },
            },
        },
    })
