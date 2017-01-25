class DotsService {
	static createDots(width, height) {

		let dots = []

		for(let i = 0; i < height; i++){
			for(let j = 0; j < width; j++){

				dots.push({ id: `${i}-${j}`, state: false})
			}	
		}
		return dots;
	}
}


export default DotsService;