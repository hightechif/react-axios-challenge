import Router from './router';
import { ThemeProvider } from 'styled-components'
import IndomaretTheme from './assets/Theme';
import './App.css';
import './styles/css/Main.css';

function App() {
  return (
    <ThemeProvider theme={IndomaretTheme} >
      <Router />
    </ThemeProvider>
  )
}

export default App;
