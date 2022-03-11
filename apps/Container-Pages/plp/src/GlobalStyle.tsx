import {createGlobalStyle} from "styled-components"
import {breakpoints} from "@monorepo/themes"

export const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  font-synthesis: none;
}
img:-moz-loading{visibility:hidden;}
*{box-sizing:border-box;}
.platform_modernisation_plp {
  & button:focus,
  a:focus {
      outline: none;
  }

  & *[data-focus-visible-added]:not(input):focus {outline: 2px solid #1d89dd;}

  & input[data-focus-visible-added]:focus  + label {outline: 2px solid #1d89dd;}
  & input[data-focus-visible-added][type="button"]:focus {outline: 2px solid #1d89dd;}
}

#header-entrypoint {
  position: fixed;
  z-index: 3;
}

#footer-entrypoint {
  position: relative;
  @media (min-width: ${breakpoints.values.lg}px) {
    z-index: 2;
  }
}

#plp-entrypoint, #plp-entrypoint:focus {
  outline: 0;
}

#plp-entrypoint[data-container-page] {
  position: relative;
  margin-top:0;
  padding-top: 5.5rem;

    @media (min-width: ${breakpoints.values.md}px) {
      padding-top: 6.5625rem;
    }

    @media (min-width: ${breakpoints.values.lg}px) {
      padding-top: 6.5625rem;
    }
  }
  `
