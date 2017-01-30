import React, { Component } from "react";
import { Layer, Line } from "react-konva";


export default class Polygons extends Component{

	constructor(props){
		super(props)

		this.player = this.props.player;
		this.step = this.props.step;

		this.coordinatesLine = [];
		this.dots = this.props.dots;
	}

	findClosestDot(dot){

		let dots = this.props.dots;
		let dotsAround = [
			dots[`id-${dot.x - this.step}-${dot.y + this.step}`],
			dots[`id-${dot.x}-${dot.y + this.step}`],
			dots[`id-${dot.x + this.step}-${dot.y + this.step}`],
			dots[`id-${dot.x + this.step}-${dot.y}`],
			dots[`id-${dot.x + this.step}-${dot.y - this.step}`],
			dots[`id-${dot.x}-${dot.y - this.step}`],
			dots[`id-${dot.x - this.step}-${dot.y - this.step}`],
			dots[`id-${dot.x - this.step}-${dot.y}`]
		];
		return dotsAround
	}

	markClosestDot(dotChecked){ // give names d0 d1 d2 d3 ...

		if(dotChecked){

			this.findClosestDot(dotChecked).forEach((it) => {
				if(!(typeof it == "undefined") && it.color === dotChecked.color 
					&& (it.d === null) ){

					this.dots[`id-${it.x}-${it.y}`].d = dotChecked.d + 1;					
					this.markClosestDot(it);
					return true 									
				}
			});
		}
	}

	findClosedPath(){ 

		let lastDot;

		this.findClosestDot(this.props.clickedDot).filter((it) => {

			if(it && it.d > 2){
				lastDot = it
				return true
			}
		});
		return lastDot // return last in polygon d... near the d0
	}	

	findPathRecursion(lastDotForPath){ // fill coordinatesLine with closed poly's dots
		this.findClosestDot(lastDotForPath).some((it) => {
			if(it && it.d !== null && lastDotForPath.d == (it.d + 1)){

				this.coordinatesLine[this.coordinatesLine.length - 1].push(it);

				if(it.d == 0){
					return true
				}

				if("x" in it){
					this.findPathRecursion(it);	
				}								
			}
		})
		return true
	}	

	deleteEmptyArr(){ // check existing opponent's dots into polygon

		this.coordinatesLine.filter((it) => {

			let rows = {};
			let oppDotCheck = 0;

			it.forEach((item) => {
				if(`${item.y}` in rows){

					rows[`${item.y}`].push(item.x);
				}
				else{
					rows[`${item.y}`] = [];
					rows[`${item.y}`].push(item.x);
				}				
			})			

			for( let I in rows ){	

				// let minX = Math.min.apply(rows[I]);
				// let maxX = Math.max.apply(rows[I]);
				console.log(rows[I])
				// rows[I].forEach((it) => {

					
				// 	if(this.props.dots[`id-${it.x}-${I}`].color == !this.player){

				// 		this.props.dots[`id-${it.x}-${I}`].captured = true;
				// 		oppDotCheck = 1; 
				// 	}
				// });
			}
			
			if(oppDotCheck){
				return true
			}
			else{
				return false
			}
		})

		// Math.max.apply
	}

	calcPoly(){ // start

		for(let I in this.props.dots){ 

			if(this.props.dots[I].x != this.props.clickedDot.x && 
				this.props.dots[I].y != this.props.clickedDot.y){

				this.props.dots[I].d = null
			}			
		}

		if("x" in this.props.clickedDot){

			this.markClosestDot(this.props.clickedDot);

			let lastDot = this.findClosedPath();

			if(lastDot){
				this.coordinatesLine.push([lastDot]);
				this.findPathRecursion(lastDot);
			} 		
		}
	}

	render(){

		console.log("jj")

		this.calcPoly(this.props.clickedDot);
		this.deleteEmptyArr()
		// console.log(this.coordinatesLine)
		let polygons = this.coordinatesLine.map((it,ind) => {

			let coords = [];

			it.forEach((item) => {
				coords.push(item.x,item.y);
			})
			return 	(<Line key={ind} 
						points={ coords }
						fill={ this.player ? "rgba(255, 0, 0, 0.3)" : "rgba(0, 0, 255, 0.3)" }
						stroke={ this.player ? "red" : "blue" }
						strokeWidth = { 2 }
						closed={ true } />)		
		})		

		// if(this.coordinatesLine.length){

		// 	polygon = (<Line points={ coords }
		// 				fill={ this.player ? "rgba(255, 0, 0, 0.3)" : "rgba(0, 0, 255, 0.3)" }
		// 				stroke={ colorLine }
		// 				strokeWidth = { 2 }
		// 				closed={ true } />)
		// }

		console.log(this.coordinatesLine)

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
				{ polygons }
			</ Layer>
		)
	}
}