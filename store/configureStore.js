import { createStore, applyMiddleware } from "redux"
import rootReducer from "../reducers"
import thunk from "redux-thunk"

function configureStore() {

	const store = createStore(rootReducer, applyMiddleware(thunk))

	if(module.hot) {

		module.hot.accept("../reducers", () => {
			const nextRootReducer = require("../reducers")
			store.replaceReducer(nextRootReducer)
		})
	}
	return store
}

const store = configureStore();

export default store