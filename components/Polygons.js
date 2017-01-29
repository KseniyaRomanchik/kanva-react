import React, { Component } from "react";
import { Layer, Line } from "react-konva";


export default class Polygons extends Component{

	constructor(props){
		super(props)

		this.player = this.props.player
		this.step = this.props.step

		this.coordinatesLine = []
		this.dots = this.props.dots

		this.i = 0

		// let polygon = {
		//     player: 1, // 1, 2
		//     coordinates:  [],
		//     capturedDotes: []

		// }
	}

	markClosestDot(dot){

		// console.log(dot)

		let dots = this.props.dots;
		let dotsAroundChecked = [
			dots[`id-${dot.x - this.step}-${dot.y + this.step}`],
			dots[`id-${dot.x}-${dot.y + this.step}`],
			dots[`id-${dot.x + this.step}-${dot.y + this.step}`],
			dots[`id-${dot.x + this.step}-${dot.y}`],
			dots[`id-${dot.x + this.step}-${dot.y - this.step}`],
			dots[`id-${dot.x}-${dot.y - this.step}`],
			dots[`id-${dot.x - this.step}-${dot.y - this.step}`],
			dots[`id-${dot.x - this.step}-${dot.y}`]
		];

		// console.log(dotsAroundChecked);

		dotsAroundChecked = dotsAroundChecked.filter((it) => {

			if(!(typeof it == "undefined") && it.color === dot.color 
					&& (it.d === null) ){
				// console.log(dot.d);
				// if(it.d === 0){

				// 	// viewPoly
				// }
				// else{
					this.dots[`id-${it.x}-${it.y}`].d = dot.d + 1;
					return true
				// }
				
			}
		})

		// console.log(dotsAroundChecked)

		return dotsAroundChecked
	}

	markRecursion(dotsArr){

		this.i++
		this.coordinatesLine.push([]);

		dotsArr.forEach((it) => {

			this.markRecursion(this.markClosestDot(it))
		})
	}

	checkClosedCycle(){

		let dot = this.props.clickedDot
		let dots = this.props.dots;
		let dotsAroundChecked = [
			dots[`id-${dot.x - this.step}-${dot.y + this.step}`],
			dots[`id-${dot.x}-${dot.y + this.step}`],
			dots[`id-${dot.x + this.step}-${dot.y + this.step}`],
			dots[`id-${dot.x + this.step}-${dot.y}`],
			dots[`id-${dot.x + this.step}-${dot.y - this.step}`],
			dots[`id-${dot.x}-${dot.y - this.step}`],
			dots[`id-${dot.x - this.step}-${dot.y - this.step}`],
			dots[`id-${dot.x - this.step}-${dot.y}`]
		];

		dotsAroundChecked = dotsAroundChecked.filter((it) => {

			if(it.d === 1){
				return true
			}
		});

		return dotsAroundChecked;
	}

	calcPoly(){ //start

		for(let I in this.props.dots){ 

			if(this.props.dots[I].x != this.props.clickedDot.x && 
				this.props.dots[I].y != this.props.clickedDot.y){

				this.props.dots[I].d = null
			}			
		}

		this.markRecursion(this.markClosestDot(this.props.clickedDot))



		// this.markClosestDot(this.props.clickedDot)
	}

	render(){

		console.log("jj")

		let coordin = this.calcPoly(this.props.clickedDot);
		let colorLine = this.player ? "red" : "blue"

		// let polygonsView = this.props.polygons.map((ind, it) => {

		//     return (<Line key={ind} 
		//                     points={ it.coordinates } 
		//                     fill={ it.player - 1 ? "rgba(0,0,255,0.3)" : "rgba(255,0,0,0.3)" }
		//                     stroke={ it.player - 1 ? "blue" : "red" }
		//                     strokeWidth = { 2 }
		//                     closed={ true }/>)
		// });

		return (
			<Layer >
				<Line points={ coordin }
					stroke={ colorLine }
					strokeWidth = { 2 }/>
			</ Layer>
		)
	}
}