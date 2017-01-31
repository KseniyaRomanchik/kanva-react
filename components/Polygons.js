import React, { Component } from "react";
import { Group, Line } from "react-konva";

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
			dots[`id-${dot.indexX - 1}-${dot.indexY + 1}`],
			dots[`id-${dot.indexX}-${dot.indexY + 1}`],
			dots[`id-${dot.indexX + 1}-${dot.indexY + 1}`],
			dots[`id-${dot.indexX + 1}-${dot.indexY}`],
			dots[`id-${dot.indexX + 1}-${dot.indexY - 1}`],
			dots[`id-${dot.indexX}-${dot.indexY - 1}`],
			dots[`id-${dot.indexX - 1}-${dot.indexY - 1}`],
			dots[`id-${dot.indexX - 1}-${dot.indexY}`]
		];
		return dotsAround
	}

	markClosestDot(dotChecked){ // give names d0 d1 d2 d3 ..., mark only my dots

		if(dotChecked){
			this.findClosestDots(dotChecked).forEach((it) => {
				if( !(typeof it == "undefined") && 
					it.color === dotChecked.color && 
					(it.d === null) && !it.intoPoly && 
					!it.captured ){
					
					let dotId = `id-${it.indexX}-${it.indexY}`;
					let positionedDot = this.dots[dotId];

					positionedDot.d = dotChecked.d + 1;
					this.props.setNewDotProperty(positionedDot,dotId);								
					this.markClosestDot(it);
					return true 									
				}
			});
		}
	}

	findClosingDot(){ 

		let lastDots = [];
		this.findClosestDots(this.props.clickedDot).filter((it) => {

			if(it && it.d > 2){
				lastDots.push(it)
				return true
			}
		});
		return lastDots // return last dot from polygon
	}	

	findPathRecursion(lastDotForPath){ // fill cordinatesLine with closed poly's dots
	
		this.findClosestDots(lastDotForPath).some((it) => {

			if(it && it.d !== null && 
			lastDotForPath.d == (it.d + 1) && 
			it.color === this.player){

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

	// console.log(this.coordinatesLine)

		this.coordinatesLine = this.coordinatesLine.filter((it) => {

			console.log("in")

			let rows = {};
			let cols = {};
			let oppDotCheck = 0;

			it.forEach((item) => { // create objects with cols and rows 

				item.inPolyBorder = true;
				this.props.setNewDotProperty(item,`id-${item.indexX}-${item.indexY}`)				
				
				if(item.indexY in rows){

					rows[item.indexY].push(item.indexX);
				}
				else{

					rows[item.indexY] = [];
					rows[item.indexY].push(item.indexX);	
				}

				if(item.indexX in cols){
					cols[item.indexX].push(item.indexY)
				}
				else{
					cols[item.indexX] = [];				
					cols[item.indexX].push(item.indexY);
				}			
			});	

			// console.log(it)

			for( let I in rows ){	

				let minX = Math.min.apply(null, rows[I]);
				let maxX = Math.max.apply(null, rows[I]);
				let minXCounter = minX;

				rows[I].forEach(() => {

					minXCounter += 1
					let dotId = `id-${minXCounter}-${I}`;

					// console.log(minXCounter < maxX , minXCounter > minX , 
					// 	this.props.dots[dotId].color === !this.player ,
					// 	!this.props.dots[dotId].captured)

					console.log(minX,minXCounter,maxX)					

					if(minXCounter < maxX && minXCounter > minX && 
						this.props.dots[dotId].color === !this.player &&
						!this.props.dots[dotId].captured){

						oppDotCheck = 1;	

						// console.log("in first")				
					}
					else if( minXCounter < maxX && minXCounter > minX 
					&& this.props.dots[dotId].color == this.player 
					&& !this.props.dots[dotId].inPolyBorder){
						
						let capturedDot = this.props.dots[dotId];
						capturedDot.intoPoly = true; 
						this.props.setNewDotProperty(capturedDot, dotId);
					}
				});
			}

			for( let I in cols ){	

				let minY = Math.min.apply(null, cols[I]);
				let maxY = Math.max.apply(null, cols[I]);
				let minYCounter = minY;

				cols[I].forEach(() => {

					minYCounter += 1;
					let dotId = `id-${I}-${minYCounter}`;									

					if(minYCounter < maxY && minYCounter > minY && 
						this.props.dots[dotId].color == !this.player &&
						!this.props.dots[dotId].captured){

						// console.log("in second")

						let capturedDot = this.props.dots[dotId];
						capturedDot.captured = true; 
						this.props.setNewDotProperty(capturedDot, dotId);
						oppDotCheck = oppDotCheck ? 2 : 1						
					}
					else if( minYCounter < maxY && minYCounter > minY 
							&& this.props.dots[dotId].color == this.player 
							&& !this.props.dots[dotId].inPolyBorder){
						
						let capturedDot = this.props.dots[dotId];
						capturedDot.intoPoly = true; 
						this.props.setNewDotProperty(capturedDot, dotId);
					}
				});
			}
			
			if(oppDotCheck == 2){
				return true 
			}
			else{
				return false
			}
		})

		this.props.setPolygons(this.coordinatesLine, this.player);
	}

	opponentDotClick(){

		// console.log(this.props.clickedDots)
		// handler for oppDot clicking
	}

	calcPoly(){ // start

		for(let I in this.props.dots){ 

			if(this.props.dots[I].indexX != this.props.clickedDot.indexX && 
				this.props.dots[I].indexY != this.props.clickedDot.indexY){

				this.props.dots[I].d = null
			}			
		}
		// for my dots
		if("color" in this.props.clickedDot && 
			this.props.clickedDot.color == this.player){

			this.markClosestDot(this.props.clickedDot);
			let lastDots = this.findClosingDot();

			if(lastDots.length){

				// let lastDot = lastDots[0];
				lastDots.forEach((it) => {

					this.coordinatesLine.push([it]);
					this.findPathRecursion(it);

					// lastDot = it.d < lastDots[0].d ? it : lastDot;
				});
				
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
		let polygons = this.props.polygons["0"].map((it,ind) => {

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
			<Group x={this.props.step/2} y={this.props.step/2} >
				{ polygons }
			</ Group>
		)
	}
}