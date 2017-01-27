import GameFieldService from "./../services/GameFieldService"
import constants from "./../constants/DotsConstants"

export function loadStore(store) {

	return {
		type: constants.LOAD_STORE,
		payload: store
	}
}

export function setNewDotProperty(key, dotObject, move) {

	return {
		type: constants.SET_NEW_DOT_PROPERTY,
		payload: {
			dot: dotObject,
			id: key,
			move: move
		}
	}
}

export function setPlayer(player) {

	return {
		type: constants.SET_PLAYER,
		payload: player
	}
}

function setFieldAction(fieldData) {

	return {
		type: constants.SET_FIELD_SIZE,
		payload: fieldData	
	}
}

export function setFieldSize(width, height, step = 25) {

	let dots = GameFieldService.setField(width, height, step);

	return (dispatch) => {

		dispatch(setFieldAction({
			dots: dots,
			size: {
				width,
				height
			}
		}));
	}
}

// refresh store with loading json
// create polys
// change dot color
// change gamefield size