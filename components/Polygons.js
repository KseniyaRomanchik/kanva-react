import React, { Component } from "react";
import { Layer, Line } from "react-konva";


export default class Polygons extends Component{

	constructor(props){
		super(props)

		this.player = this.props.player
		this.step = this.props.step

		this.coordinatesLine = []

		// let polygon = {
		//     player: 1, // 1, 2
		//     coordinates:  [],
		//     capturedDotes: []

		// }
	}

	checkClosedPoly(checkDot){

		if( "color" in checkDot ){

			let dots = this.props.dots

			// if(checkDot)

			let dotsAroundChecked = [
				dots[`id-${checkDot.x - this.step}-${checkDot.y + this.step}`],
				dots[`id-${checkDot.x}-${checkDot.y + this.step}`],
				dots[`id-${checkDot.x + this.step}-${checkDot.y + this.step}`],
				dots[`id-${checkDot.x + this.step}-${checkDot.y}`],
				dots[`id-${checkDot.x + this.step}-${checkDot.y - this.step}`],
				dots[`id-${checkDot.x}-${checkDot.y - this.step}`],
				dots[`id-${checkDot.x - this.step}-${checkDot.y - this.step}`],
				dots[`id-${checkDot.x - this.step}-${checkDot.y}`]
			];

			// this.coordinatesLine.push(this.props.clickedDot.x)
			// this.coordinatesLine.push(this.props.clickedDot.y)
				
			// check dots around

			console.log(dotsAroundChecked);

			dotsAroundChecked = dotsAroundChecked.filter((it) => { 

				// check dotes near the edge && find my colored Dot

				if(typeof it != "undefined" && it.color === this.player){
					
					this.coordinatesLine.push(it.x)
					this.coordinatesLine.push(it.y)

					return true
				}            
			})
			dotsAroundChecked
			console.log(dotsAroundChecked);
			return this.coordinatesLine
		}
		else{
			return []
		}
	}

	render(){

		let coordin = this.checkClosedPoly(this.props.clickedDot);
		let colorLine = this.player ? "red" : "blue"

		// console.log(coordin,colorLine)

		// let polygonsView = ("color" in this.props.clickedDot) ? this.checkClosedPoly(this.props.checkedDot) : <Line /> ;

		// console.log("color" in this.props.clickedDot)

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