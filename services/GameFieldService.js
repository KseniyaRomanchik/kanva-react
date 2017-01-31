export default class GameFieldService {
	
	static setField(width, height, step) {

		let dots = {},
			widthPixels = width * step;
			
			// heightPixels = height * step;

		for(let i = 0; i < height * width; i++){

			let x = (step * i) - (Math.floor(i / width) * widthPixels),
				y = (Math.floor(i / width) * step)
			
			dots[`id-${x/step}-${y/step}`] = {
				x,
				y,
				indexX : x/step,
				indexY : y/step,
				captured: false,
				color: "", // 0 - blue,1 - red
				d: null,
				inPoly: false
			};
		}
		return dots;
	}
}