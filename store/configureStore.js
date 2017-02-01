import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import DevTools from "../containers/DevTools";

// const enhancer = compose(
//   // Middleware you want to use in development:
//   applyMiddleware(thunk),
//   // Required! Enable Redux DevTools with the monitors you chose
//   DevTools.instrument()
// );

export default function configureStore(initialState) {

	const enhancer = compose(
		applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
);
// const store = createStore(rootReducer, defaultState, enhancers);

	const store = createStore(rootReducer, initialState, enhancer);

	if(module.hot) {

		module.hot.accept("../reducers", () => { 
			store.replaceReducer(require("../reducers"))
		})
	}
	return store
}

// export const store = configureStore();