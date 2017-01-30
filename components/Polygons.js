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

	findClosestDots(dot){ // all dots

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

	markClosestDot(dotChecked){ // give names d0 d1 d2 d3 ..., mark only my dots

		if(dotChecked){
			this.findClosestDots(dotChecked).forEach((it) => {
				if( !(typeof it == "undefined") && 
					it.color === dotChecked.color && 
					(it.d === null) && !it.inPoly && 
					!it.captured ){

					this.dots[`id-${it.x}-${it.y}`].d = dotChecked.d + 1;					
					this.markClosestDot(it);
					return true 									
				}
			});
		}
	}

	findClosingDot(){ 

		let lastDot;
		this.findClosestDots(this.props.clickedDot).filter((it) => {

			if(it && it.d > 2){
				lastDot = it
				return true
			}
		});
		return lastDot // return last dot from polygon
	}	

	findPathRecursion(lastDotForPath){ // fill coordinatesLine with closed poly's dots
		this.findClosestDots(lastDotForPath).some((it) => {
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

	deleteEmptyPolygons(){ // check existing opponent's dots into polygon

		this.coordinatesLine = this.coordinatesLine.filter((it) => {

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

				let minX = Math.min.apply(null, rows[I]);
				let maxX = Math.max.apply(null, rows[I]);
				let minXCounter = minX;

				rows[I].forEach(() => {

					minXCounter += this.step					

					if(minXCounter < maxX && minXCounter > minX && this.props.dots[`id-${minXCounter}-${I}`].color == !this.player){

						let capturedDot = this.props.dots[`id-${minXCounter}-${I}`];
						capturedDot.captured = true; 
						this.props.setNewDotProperty(capturedDot, `id-${minXCounter}-${I}`);
						oppDotCheck++						
					}
					else if( minXCounter < maxX && minXCounter > minX && this.props.dots[`id-${minXCounter}-${I}`].color == this.player ){
						
						let capturedDot = this.props.dots[`id-${minXCounter}-${I}`];
						capturedDot.inPoly = true; 
						this.props.setNewDotProperty(capturedDot, `id-${minXCounter}-${I}`);
					}
				});
			}
			
			if(oppDotCheck){
				return true
			}
			else{
				return false
			}
		})
	}

	opponentDotClick(){

		console.log(this.props.clickedDots)
		// handler for oppDot clicking
	}

	calcPoly(){ // start

		for(let I in this.props.dots){ 

			if(this.props.dots[I].x != this.props.clickedDot.x && 
				this.props.dots[I].y != this.props.clickedDot.y){

				this.props.dots[I].d = null
			}			
		}
		// for my dots
		if("color" in this.props.clickedDot && 
			this.props.clickedDot.color == this.player){

			this.markClosestDot(this.props.clickedDot);

			let lastDot = this.findClosingDot();

			if(lastDot){
				this.coordinatesLine.push([lastDot]);
				this.findPathRecursion(lastDot);
			} 		
		}
		// for opponent dots
		else if( this.props.clickedDot.color == !this.player ){

			this.opponentDotClick()
		}
	}

	render(){

		console.log("jj");
		this.calcPoly(this.props.clickedDot);
		this.deleteEmptyPolygons();
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
		});

		return (
			<Layer >
				{ polygons }
			</ Layer>
		)
	}
}