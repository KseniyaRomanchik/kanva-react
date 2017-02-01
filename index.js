import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import App from "./containers/App";
// import DevTools from './containers/DevTools';

import * as actions from "./actions/actions";
// import DevTools from './containers/DevTools';

const store = configureStore();

store.dispatch(actions.setFieldSize(39, 32)); //init

render(
	<Provider store={ store }>
		<App />
	</ Provider>,
	document.getElementById("container")
);