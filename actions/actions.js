import GameFieldService from "./../services/GameFieldService"
import constants from "./../constants/DotsConstants"

export function loadStore(store) {

	return {
		type: constants.LOAD_STORE,
		payload: store
	}
}

export function setPolygons(coordLine, player){

	return {
		type: constants.SET_POLYGONS,
		payload: {
			polygons: coordLine,
			player : player
		}
	}
}

export function setNewDotProperty(dot,id) {

	return {
		type: constants.SET_NEW_DOT_PROPERTY,
		payload: {
			dot: dot,
			id: id
		}
	}
}

export function setPlayer(move) {

	return {
		type: constants.SET_PLAYER,
		payload: move
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