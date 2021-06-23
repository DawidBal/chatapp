import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

html {
  box-sizing: border-box;
}

*,*::after,*::before {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
}
`
export default GlobalStyles