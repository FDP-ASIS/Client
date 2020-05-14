import React from 'react';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { Routes } from '../routers/routes';

import './App.css';

const App: React.SFC = () => {
	return (
		<React.StrictMode>
			<Provider store={store}>
				<Routes />
			</Provider>
		</React.StrictMode>
	);
};

export default App;
