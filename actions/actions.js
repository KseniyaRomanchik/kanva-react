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

export function setEmptyPolygon(polyArr) {

	return {
		type: constants.SET_EMPTY_POLYGON,
		payload: polyArr
	}
}

export function setGame(json) {

	return {
		type: constants.SET_GAME,
		payload: json
	}
}

function setFieldAction(fieldData) {

	return {
		type: constants.SET_FIELD_SIZE,
		payload: fieldData	
	}
}

export function setFieldSize(width, height, step, timer = 0.2 * 60 * 1000) {

	let dots = GameFieldService.setField(width, height, step);

	return (dispatch) => {

		dispatch(setFieldAction({
			dots: dots,
			fieldSize: {
				width,
				height,
				step,
				timer
			},
			polygons:{
				0:[],
				1:[], 
				emptyPoly0: [],
				emptyPoly1: []
			},
			currentMove: {
				player: 0,
				clickedDot: {},
				timer: timer
			}
		}));
	}
}

// refresh store with loading json
// create polys
// change dot color
// change gamefield size