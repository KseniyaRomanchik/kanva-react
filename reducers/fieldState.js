import constants from "./../constants/DotsConstants"

let initialState = {
	dots: {},
	size: { width: 0, height: 0}, // dotes
	step: 25,
	move: 0,
	polygons: []
}

export default function fieldState(state = initialState, action) {
	
	switch (action.type) {
		case constants.SET_NEW_DOT_PROPERTY: {
			
			return Object.assign({}, state, action.payload);
		}

		case constants.SET_FIELD_SIZE: {

			return Object.assign({}, state, action.payload);
		}

		case constants.SET_PLAYER: {

			return Object.assign({}, state, action.payload);
		}
		
		default : { return state }
	}
}