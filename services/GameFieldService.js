export default class GameFieldService {
	
	static setField(width, height, step) {

		let dots = {},
			widthPixels = width * step;
			
			// heightPixels = height * step;

		for(let i = 0; i < height * width; i++){

			let x = ((step * i) - (Math.floor(i / width) * widthPixels)) + step/2,
				y = (Math.floor(i / width) * step) + step/2
			
			dots[`id-${x}-${y}`] = {
				x,
				y,
				captured: false,
				color: "" // 0,1
			};
		}
		return dots;
	}
}