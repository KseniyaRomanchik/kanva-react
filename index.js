import Konva from "konva";

const WIDTH = 30,
	HEIGHT = 30;

var Stage = new Konva.Stage({
		container: "container",   // id of container <div>
		width: 500,
		height: 500
	}),
	LayerDots = new Konva.Layer(),
	Back = new Konva.Rect({
		x: 0,
		y: 0,
		width: Stage.getWidth(),
		height: Stage.getHeight(),
		fill: "rgba(105,100,150, 0.3)",
		stroke: "gray",
		strokeWidth: 2
	}),
	LayerPoly = new Konva.Layer();
	// Circles = [];

let stepW = Stage.getWidth() / WIDTH,
	stepH = Stage.getHeight() / HEIGHT;

let DotsCoord = [];

LayerDots.add(Back)

for( let i = 0; i < WIDTH * HEIGHT; i++ ){

	let circle = new Konva.Circle({
		x: ((stepW * i) - (Math.floor(i / WIDTH) * Stage.getWidth())) + stepW/2 ,
		y: (Math.floor(i / WIDTH) * stepH) + stepH/2,
		radius: 3,
		fill: "red"
	});

	circle.on("click", (e) => {

		console.log("enter")

		LayerDots.draw();
		DotsCoord.push({ x: e.target.x(), y: e.target.y() });

		if(DotsCoord.length === 4){

			let poly = new Konva.Line({
				points: [ DotsCoord[0].x, DotsCoord[0].y, 
							DotsCoord[1].x, DotsCoord[1].y,
							DotsCoord[2].x, DotsCoord[2].y,
							DotsCoord[3].x, DotsCoord[3].y,],
				fill: "rgba(10,150,150,0.3)",
				stroke: "rgba(10,150,150,1)",
				strokeWidth: 5,
				closed : true
			});

			DotsCoord = [];
			LayerPoly.add(poly);
			Stage.draw();
		}
	});
	LayerDots.add(circle);
}

// let poly = new Konva.Line({
// 	points: [0,150,100,10],
// 	fill: "#00D2FF",
// 	stroke: "black",
// 	strokeWidth: 5
// 	// closed : true
// });

// LayerPoly.add(poly)

Stage.add(LayerDots, LayerPoly);