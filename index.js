import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import App from "./containers/App";

import * as actions from "./actions/actions";

const store = configureStore();
store.dispatch(actions.setFieldSize(39, 32, 25)); //init
window.store = 

render(
	<Provider store={ store }>
		<App />
	</ Provider>,
	document.getElementById("container")
);       
