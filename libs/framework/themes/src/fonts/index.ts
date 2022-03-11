import {ThemeColor} from "../themecolors"

export const buildFont = (fontFamily, format, url): string =>
    `url("${url}/${fontFamily}.${format}") format('${format}')`

export const fontBuilder =
    (fontFamily, url) =>
    (...formats: string[]): string => {
        return formats.map(format => buildFont(fontFamily, format, url)).join(", ")
    }

const str = (family, filename, formats, url) => {
    if (filename) return `src: ${fontBuilder(filename, url)(...formats)};`
    return `src: local(${family});`
}

export const FONTS = (theme: ThemeColor, url: string, containerId) => `
    <style id="font-ssr-styles" type="text/css">
        @font-face {
            font-family: ${theme.font.primary.light.family};
            ${str(
                theme.font.primary.light.family,
                theme.font.primary.light.filename,
                theme.font.primary.light.formats,
                url,
            )}
            font-weight: ${theme.font.primary.light.weight};
        }
        @font-face {
            font-family: ${theme.font.primary.regular.family};
            ${str(
                theme.font.primary.regular.family,
                theme.font.primary.regular.filename,
                theme.font.primary.regular.formats,
                url,
            )}
            font-weight: ${theme.font.primary.regular.weight};
        }
        @font-face {
            font-family: ${theme.font.primary.medium.family};
            ${str(
                theme.font.primary.medium.family,
                theme.font.primary.medium.filename,
                theme.font.primary.medium.formats,
                url,
            )}
            font-weight: ${theme.font.primary.medium.weight};
        }
        @font-face {
            font-family: ${theme.font.primary.italic.family};
            ${str(
                theme.font.primary.italic.family,
                theme.font.primary.italic.filename,
                theme.font.primary.italic.formats,
                url,
            )}
            font-weight: ${theme.font.primary.italic.weight};
        }
        @font-face {
            font-family: ${theme.font.secondary.light.family};
            ${str(
                theme.font.secondary.light.family,
                theme.font.secondary.light.filename,
                theme.font.secondary.light.formats,
                url,
            )}
            font-weight: ${theme.font.secondary.light.weight};
        }
        @font-face {
            font-family: ${theme.font.secondary.regular.family};
            ${str(
                theme.font.secondary.regular.family,
                theme.font.secondary.regular.filename,
                theme.font.secondary.regular.formats,
                url,
            )}
            font-weight: ${theme.font.secondary.regular.weight};
        }
        @font-face {
            font-family: ${theme.font.secondary.medium.family};
            ${str(
                theme.font.secondary.medium.family,
                theme.font.secondary.medium.filename,
                theme.font.secondary.medium.formats,
                url,
            )}
            font-weight: ${theme.font.secondary.medium.weight};
        }
        @font-face {
            font-family: ${theme.font.secondary.italic.family};
            ${str(
                theme.font.secondary.italic.family,
                theme.font.secondary.italic.filename,
                theme.font.secondary.italic.formats,
                url,
            )}
            font-weight: ${theme.font.secondary.italic.weight};
        }
        ${containerId.includes("#") ? containerId : `#${containerId}`} {
            font-family: ${theme.font.primary.regular.family}, ${theme.font.default};
        }
    </style>`
