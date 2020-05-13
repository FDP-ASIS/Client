import React from 'react';
import { store } from '../redux/store';
import { Provider } from 'react-redux';

import Splash from '../pages/splash';

import './App.css';

function App(): React.ReactElement {
	return (
		<React.StrictMode>
			<Provider store={store}>
				<Splash />
			</Provider>
		</React.StrictMode>
	);
}

export default App;
