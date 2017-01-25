import constants from "./../constants/DotsConstants"

let initialState = {
	dots: [],
	size: { width: 0, height: 0}
}

export default function userstate(state = initialState, action) {
console.log(action.type);
	switch (action.type) {
		case constants.SET_DOT_STATE: 
		console.log(action.payload);
			return Object.assign({}, state, {
				dots: [
					...action.payload
				]
			});
		case constants.SET_DOTS: 

			return Object.assign({}, state, 
				action.payload);
		
		default : { return state }
	}
}