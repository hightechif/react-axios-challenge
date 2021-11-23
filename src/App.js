import Router from './router';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from 'styled-components'
import IndomaretTheme from './assets/Theme';
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
        <Provider store={store}>
          <Router />
        </Provider>
      </StyledFont>
    </ThemeProvider>
  )
}

export default App;
