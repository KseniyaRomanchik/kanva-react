import React, { Component } from "react";
import { Group, Line } from "react-konva";

export default class Polygons extends Component{

	constructor(props){
		super(props)

		this.player = this.props.player;
		this.step = this.props.step;

		this.coordinatesLine = [];
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
					(it.d === undefined) && !it.intoPoly && 
					!it.captured ){
					
					let dotId = `id-${it.indexX}-${it.indexY}`;
					let positionedDot = this.props.dots[dotId];

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
	
		this.findClosestDots(lastDotForPath).filter((it) => {

			if(it && it.d !== undefined && 
			lastDotForPath.d == (it.d + 1) && 
			it.color === this.player){

				this.coordinatesLine[this.coordinatesLine.length - 1].push(it);

				if(it.d == 0){
					return true
				}

				if("indexX" in it){
					this.findPathRecursion(it);	
				}								
			}
		})
		return true
	}	

	deleteEmptyPolygons(){ // sort polygons (empty and full)

		this.coordinatesLine = this.coordinatesLine.filter((it) => {

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

					if(minXCounter < maxX && minXCounter > minX && 
						this.props.dots[dotId].color == !this.player &&
						!this.props.dots[dotId].captured){
						
						// if(!this.player) console.log("in first")

						oppDotCheck = 1;				
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
						
						// if(!this.player) console.log("in second")

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
				if(it.length){
					this.props.setEmptyPolygon({
						player: this.player,
						polygons: it
					});
				}				
				return false
			}
		});

		
		if(this.coordinatesLine.length){

			this.props.setPolygons(this.coordinatesLine, this.player);
		}		
	}

	opponentDotClick(){

		// console.log(this.props.clickedDots)
		// handler for oppDot clicking
	}

	calcPoly(){ // start
		
		if(this.props.move != this.player){

			// console.log(this.props.clickedDot)

			for(let I in this.props.dots){ 

				// console.log(this.props.clickedDot.d)
				if(this.props.dots[I].indexX != this.props.clickedDot.indexX && 
					this.props.dots[I].indexY != this.props.clickedDot.indexY &&
					this.props.dots[I].d !== undefined){

					// console.log(this.props.clickedDot.d)
					let dot = this.props.dots[I];
					dot.d = undefined;
					this.props.setNewDotProperty(dot,I);
				}			
			}
		}
		
		// for my dots
		if("color" in this.props.clickedDot && 
			this.props.clickedDot.color == this.player){

			this.markClosestDot(this.props.clickedDot);
			let lastDots = this.findClosingDot();

			if(lastDots.length){

				lastDots.forEach((it) => {

					this.coordinatesLine.push([it]);
					this.findPathRecursion(it);
				});				
			} 		
		}
		// for opponent dots
		else if( this.props.clickedDot.color == !this.player ){

			this.opponentDotClick();
		}
	}

	getPolygonArea(polygonsArr){
		let x = [];
		let y = [];
		let summ1 = [];
		let summ2 = [];
		polygonsArr.push(polygonsArr[0]);

		polygonsArr.forEach((it, ind, arr) => {

			x.push(+it.indexX);
			y.push(+it.indexY);

			if(ind + 1 < arr.length){

				summ1.push(+it.indexX * +arr[ind + 1].indexY);
				summ2.push(+it.indexY * +arr[ind + 1].indexX);
			}	
		});

		summ1 = summ1.reduce((prev,curr) => {
			return prev + curr;
		});
		summ2 = summ2.reduce((prev,curr) => {
			return prev + curr;
		});

		return Math.abs((summ1 - summ2)/2);
	}

	render(){

		this.coordinatesLine = [];
		console.log("jj");
		console.log(JSON.stringify(this.props.polygons[this.player]));
		
		this.calcPoly(this.props.clickedDot);
		this.deleteEmptyPolygons();

		let polygons = this.props.polygons[this.player].map((it,ind) => {
			
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
			<Group>
				{ polygons }
			</ Group>
		)
	}
}