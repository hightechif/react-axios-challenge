import Router from './router';
import { ThemeProvider } from 'styled-components'
import IndomaretTheme from './assets/Theme';
import './App.css';
import './styles/css/Main.css';
import styled from 'styled-components';
require('dotenv').config();

const StyledFont = styled.div`
  font-family: "Open Sans";
`

function App() {
  return (
    <ThemeProvider theme={IndomaretTheme} >
      <StyledFont>
        <Router />
      </StyledFont>
    </ThemeProvider>
  )
}

export default App;
