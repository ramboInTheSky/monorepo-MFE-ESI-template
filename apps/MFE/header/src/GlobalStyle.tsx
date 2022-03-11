import {createGlobalStyle} from "styled-components"
import {ThemeColor, breakpoints} from "@monorepo/themes"
import {RealmStyles} from "./models/regions/index"

type GlobalStyleProps = {
    theme: {
        styles: RealmStyles
        colors: ThemeColor
    }
}

export const GlobalStyle = createGlobalStyle`
body{
  margin: 0
}

#platform_modernisation_header {
  font-size: 16px;
  * {
    box-sizing: border-box;
  }
    
  ul, ul li {
      list-style: none;
  }

  img, a img {
      display: inline;
  }

  & button:focus,
  a:focus {
      outline: none;
  }

  & *[data-focus-visible-added]:focus {outline: 2px solid #1d89dd;} 
  & #header-big-screen-search-box:focus, #header-small-screen-search-box:focus {outline: none}
}

[data-container-page] {
    margin-top: ${(props: GlobalStyleProps) =>
        `calc(${props.theme.styles.UpperHeader.xs.height} + ${props.theme.styles.PrimaryNav.xs.height})`};

    @media (min-width: ${breakpoints.values.md}px) {
      margin-top: ${(props: GlobalStyleProps) =>
          `calc(${props.theme.styles.UpperHeader.md.height} + ${props.theme.styles.PrimaryNav.md.height})`};
    }

    @media (min-width: ${breakpoints.values.lg}px) {
      margin-top: ${(props: GlobalStyleProps) =>
          `calc(${props.theme.styles.UpperHeader.lg.height} + ${props.theme.styles.PrimaryNav.lg.height})`};
    }
}

`
