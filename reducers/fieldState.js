import constants from "./../constants/DotsConstants"

let initialState = {
	dots: {},
	size: { width: 0, height: 0} // dotes
}

export default function dotsState(state = initialState, action) {
// console.log(action.type);
	switch (action.type) {
		case constants.SET_DOT_COLOR: {
		// console.log(action.payload);
			state.dots[action.payload.id] = action.payload.dotObject

			return Object.assign({}, state);
		}

		case constants.SET_FIELD_SIZE: {

			// console.log(action)

			return Object.assign({}, state, action.payload);
		}
		
		default : { return state }
	}
}