import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import IndomaretTheme from './assets/Theme';
import './assets/css/Main.css';
import './assets/css/Tailwind.css';
require('dotenv').config();

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={IndomaretTheme} >
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
