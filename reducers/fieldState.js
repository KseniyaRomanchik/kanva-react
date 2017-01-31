import constants from "./../constants/DotsConstants"

let initialState = {
	dots: {},
	size: { width: 0, height: 0}, // dots
	step: 25,
	move: {
		player: 0,
		clickedDot: {}
	},
	polygons: {
		0:[], // player 0
		1:[]  // player 1
	}
}

export default function fieldState(state = initialState, action) {
	
	switch (action.type) {
		case constants.SET_NEW_DOT_PROPERTY: {

			state.dots[action.payload.id] = action.payload.dot
			// console.log(state.dots)
			return Object.assign({}, state);
		}

		case constants.SET_POLYGONS: {

			state.polygons[action.payload.player] = state.polygons[action.payload.player].concat(action.payload.polygons);
			
			return Object.assign({}, state);
		}

		case constants.SET_FIELD_SIZE: {

			return Object.assign({}, state, action.payload);
		}

		case constants.SET_PLAYER: {

			return { ...state, move: action.payload.move};
		}
		
		default : { return state }
	}
}