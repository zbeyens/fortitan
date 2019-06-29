import { createGlobalStyle } from 'styled-components';

// Global styles but theme- and update-able!
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0px;
    padding: 0px;
  }

  html, body {
    width: 100%;
    height: 100%;
  }

  body {
    position: relative;
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => `${theme.fontSizes[1]}px`};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    /* overflow: hidden; */
  }
  
  #root {
    height: 100%;
  }
  
  #phaser-game {
    width: 100%;
    height: 100%;
    
    canvas {
      position: absolute;
    }
  }
`;

export default GlobalStyle;
