import {createGlobalStyle} from "styled-components"

export const GlobalStyle = createGlobalStyle`
body{
  margin: 0;
}
#platform_modernisation_footer {
  color: #000;
  font-size: 16px; 
  
  ul, ul li {
      list-style: none; 
  }

  img, a img {
      display: inline; 
  }

  h2 { 
    /* Override MVC */
    background: none;
    padding: 0;
    transition: unset;
    text-indent: 0;
    text-transform: none;
    border-left: 0;
    border-right: 0;
  }
}`

/* istanbul ignore file */