import DotsService from "./../services/DotsService"
import constants from "./../constants/DotsConstants"

export function setDotState(dots) {

	return {
		type: constants.SET_DOT_STATE,
		payload: dots
	}
}

function setDotsAction(data) {

	return {
		type: constants.SET_DOTS,
		payload: data	
	}
}

export function setDots(width, height) {

	return (dispatch) => {
		
		let dots = DotsService.createDots(width, height);

		dispatch(setDotsAction({
			dots: dots,
			size: {
				width,
				height
			}
		}));
	}
}