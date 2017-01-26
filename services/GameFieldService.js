export default class GameFieldService {
	
	static setField(width, height, step) {

		let dots = {},
			widthPixels = width * step;
			// heightPixels = height * step;

		for(let i = 0; i < height * width; i++){
			
			dots[`id${i}`] = {
				player: 0,
				x: ((step * i) - (Math.floor(i / width) * widthPixels)) + step/2 ,
				y: (Math.floor(i / height) * step) + step/2
			};
		}
		return dots;
	}
}