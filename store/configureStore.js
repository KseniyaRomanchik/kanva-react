import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";

// const enhancer = compose(
//   // Middleware you want to use in development:
//   applyMiddleware(thunk),
//   // Required! Enable Redux DevTools with the monitors you chose
//   DevTools.instrument()
// );

export default function configureStore() {

	const store = createStore(rootReducer, applyMiddleware(thunk));

	if(module.hot) {

		module.hot.accept("../reducers", () => { 
			store.replaceReducer(require("../reducers"))
		})
	}
	return store
}

// export const store = configureStore();