import {createGlobalStyle} from "styled-components"

/*
 * using !important here due to bug in material ui
 * refer to https://github.com/mui-org/material-ui/issues/10000
 */
export const GlobalStyle = createGlobalStyle`
body{
  margin: 0;
}

#platform_modernisation_meganav {
  color: #000;
  font-size: 16px; 
  * {
    box-sizing:border-box;
    }
  ul, ul li {
      list-style: none; 
  }

  img, a img {
      display: inline; 
  }
  & :focus { outline: none; }
}`
