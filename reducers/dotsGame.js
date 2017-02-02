import constants from "./../constants/DotsConstants"

let initialState = {
	"dots": {},
	"fieldSize": { 
		"width": 0, 
		"height": 0,
		"step": 0,
		"timer": 0
	}, 
	"currentMove": {
		"player": 0,
		"clickedDot": {}
	},
	"polygons": {
		"0":[], // player 0
		"1":[], // player 1
		"emptyPoly0": [],
		"emptyPoly1": []
	}
}

export default function dots(state = initialState, action) {
	
	switch (action.type) {
		case constants.SET_NEW_DOT_PROPERTY: {

			state.dots[action.payload.id] = action.payload.dot
			return Object.assign({}, state);
		}

		case constants.SET_POLYGONS: {

			state.polygons[action.payload.player] = state.polygons[action.payload.player].concat(action.payload.polygons);
			
			return Object.assign({}, state);
		}

		case constants.SET_EMPTY_POLYGON: {

			let key = "emptyPoly" + action.payload.player;
			state.polygons[key].push(action.payload.polygons);
			
			return Object.assign({}, state);
		}

		case constants.SET_FIELD_SIZE: {

			return Object.assign({}, state, action.payload);
		}

		case constants.SET_GAME: {

			return Object.assign({}, action.payload.dots);
		}

		case constants.SET_PLAYER: {

			return { ...state, currentMove: action.payload.move};
		}
		
		default : { return state }
	}
}