import {createTheme} from "@mui/material"
import {mockTheme as theme} from "@monorepo/themes"

const muiTheme = createTheme({
    typography: {
        fontFamily: `${theme.colours.font.regular.family}, ${theme.colours.font.default}`,
        h1: {
            fontFamily: `${theme.colours.font.medium.family}, ${theme.colours.font.default}`,
            color: theme.colours.text.default,
            fontSize: "1.5rem",
            letterSpacing: "0.12px",
            lineHeight: 1.5,
            fontWeight: theme.colours.font.medium.weight,
        },
        h2: {
            fontFamily: `${theme.colours.font.medium.family}, ${theme.colours.font.default}`,
            color: theme.colours.text.default,
            fontSize: "1.25rem",
            letterSpacing: "0.12px",
            lineHeight: 1.5,
            fontWeight: theme.colours.font.medium.weight,
        },
        h3: {
            fontFamily: `${theme.colours.font.medium.family}, ${theme.colours.font.default}`,
            color: theme.colours.text.default,
            fontSize: "1rem",
            letterSpacing: "0.12px",
            lineHeight: 1.5,
            fontWeight: theme.colours.font.medium.weight,
        },
        h4: {
            fontFamily: `${theme.colours.font.medium.family}, ${theme.colours.font.default}`,
            color: theme.colours.text.default,
            fontSize: "0.938rem",
            lineHeight: 1.5,
            letterSpacing: "0.12px",
            fontWeight: theme.colours.font.medium.weight,
        },
        h5: {
            fontFamily: `${theme.colours.font.medium.family}, ${theme.colours.font.default}`,
            color: theme.colours.text.default,
            fontSize: "0.875rem",
            letterSpacing: "0.12px",
            lineHeight: 1.5,
            fontWeight: theme.colours.font.medium.weight,
        },
        h6: {
            fontFamily: `${theme.colours.font.medium.family}, ${theme.colours.font.default}`,
            color: theme.colours.text.default,
            fontSize: "0.75rem",
            lineHeight: 1.5,
            letterSpacing: "0.12px",
            fontWeight: theme.colours.font.medium.weight,
        },
        subtitle1: {
            color: theme.colours.text.default,
            fontSize: "0.875rem",
            lineHeight: 1.5,
            letterSpacing: "0.12px",
        },
        subtitle2: {
            color: theme.colours.text.default,
            fontSize: "0.875rem",
            lineHeight: 1.5,
            letterSpacing: "0.12px",
        },
        body1: {
            color: theme.colours.text.default,
            fontSize: "0.875rem",
            lineHeight: 1.5,
            letterSpacing: "0.12px",
        },
        body2: {
            color: theme.colours.text.default,
            fontSize: "0.75rem",
            lineHeight: 1.5,
            letterSpacing: "0.12px",
        },
    },
    palette: {
        primary: {
            main: theme.colours.text.default,
        },
        secondary: {
            main: theme.colours.text.reversed,
        },
        error: {
            main: theme.colours.text.error,
        },
        warning: {
            main: theme.colours.text.warning,
        },
        success: {
            main: theme.colours.text.success,
        },
        action: {
            disabledOpacity: 0.5,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: `${theme.colours.font.medium.family}, ${theme.colours.font.default}`,
                    textTransform: "none",
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
                    letterSpacing: "0.12px",
                    fontWeight: theme.colours.font.medium.weight,
                    background: theme.colours.form.buttonPrimary.background,
                    color: theme.colours.form.buttonPrimary.color,
                    borderRadius: theme.colours.form.buttonPrimary.radius,
                    border: theme.colours.form.buttonPrimary.border,
                    "&:focus": {
                        border: theme.colours.form.focusActive.border,
                        background: theme.colours.form.focusActive.background,
                        borderRadius: theme.colours.form.focusActive.radius,
                    },
                    "&:active": {
                        border: theme.colours.form.selectedBlock.border,
                        background: theme.colours.form.selectedBlock.background,
                        borderRadius: theme.colours.form.selectedBlock.radius,
                    },
                    "&:disabled": {
                        border: theme.colours.form.disabled.border,
                        background: theme.colours.form.disabled.background,
                        borderRadius: theme.colours.form.disabled.radius,
                    },
                },
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    backgroundColor: theme.colours.utilities.backgroundAccent,
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    "&$selected": {backgroundColor: theme.colours.utilities.backgroundAccent},
                    "&$selected:hover": {backgroundColor: theme.colours.utilities.backgroundAccent},
                },
            },
        },
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
    },
})

export default muiTheme
