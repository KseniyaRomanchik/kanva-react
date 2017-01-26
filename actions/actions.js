import GameFieldService from "./../services/GameFieldService"
import constants from "./../constants/DotsConstants"

export function loadStore(store) {

	return {
		type: constants.LOAD_STORE,
		payload: store
	}
}

export function setDotColor(key, dotObject) {

	return {
		type: constants.SET_DOT_COLOR,
		payload: {
			dot: dotObject,
			id: key
		}
	}
}

function setFieldAction(fieldData) {

	return {
		type: constants.SET_FIELD_SIZE,
		payload: fieldData	
	}
}

export function setFieldSize(width, height, step) {

	let dots = GameFieldService.setField(width, height, step);

	return (dispatch) => {

		dispatch(setFieldAction({
			dots: dots,
			size: {
				width,
				height
			},
			step: step
		}));
	}
}

// refresh store with loading json
// create polys
// change dot color
// change gamefield size