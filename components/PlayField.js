import React, { Component } from "react";
import { Stage, Layer, Circle, Rect } from "react-konva";
import PolygonsContainer from "./../containers/PolygonsContainer"

export default class PlayField extends Component {

	constructor(props){
		super(props)

		this.timer = {};

		this.props.dots["id-0-2"].color = 1;
		this.props.dots["id-0-1"].color = 1;
		this.props.dots["id-0-4"].color = 1;
		this.props.dots["id-2-1"].color = 1;
		this.props.dots["id-2-2"].color = 1;
		this.props.dots["id-2-4"].color = 1;
		this.props.dots["id-1-0"].color = 1;
		this.props.dots["id-1-1"].color = 1;
		this.props.dots["id-1-5"].color = 1;
		this.props.dots["id-1-2"].color = 0;
		this.props.dots["id-1-4"].color = 0;

		// this.props.dots["id-1-0"].color = 1;
		// this.props.dots["id-2-1"].color = 1;
		// // this.props.dots["id-2-2"].color = 1;
		// this.props.dots["id-1-3"].color = 1;
		// this.props.dots["id-0-2"].color = 1;
		// this.props.dots["id-0-1"].color = 1;
	}

	identyPlayer(e){

		let id = `id-${ (e.target.attrs.x + this.props.step/2) / this.props.step }-${ (e.target.attrs.y + this.props.step/2) / this.props.step }`;

		if(this.props.dots[id].color === ""){	

			let dotid = Object.assign({}, this.props.dots[id]);
			dotid.color = this.props.currentMove.player;			
			dotid.d = 0; 
			this.props.setNewDotProperty(dotid, id);
			this.props.setPlayer({ 
				currentMove : { 
					player: this.props.currentMove.player ? 0 : 1, 
					clickedDot: dotid,
					timer: this.props.timer
				}
			});		
		}		
	}

	render(){
		let dots = [],
			cells = [],
			i = 0;
		for( let I in this.props.dots){

			dots.push(
				<Circle key={ i++ } 
						radius={ this.props.step/5 }
						fill={ this.props.dots[I].color ? "red" : (this.props.dots[I].color === 0 ? "blue" : "#ddd" ) }
						x={ this.props.dots[I].x }
						y={ this.props.dots[I].y } />)

			cells.push(
				<Rect key={ i++ }
					onClick={ this.identyPlayer.bind(this) }
					width={ this.props.step }
					height={ this.props.step }
					x={ this.props.dots[I].x - this.props.step/2 }
					y={ this.props.dots[I].y - this.props.step/2 }>
				></ Rect>)
		}

		return (
			<div>
				<h1>
					<span className={ "player" + this.props.currentMove.player }>
						Player { this.props.currentMove.player }
					</span> move
				</h1>
				<Stage width={ this.props.width } 
						height={ this.props.height } 
						x={this.props.step/2} 
						y={this.props.step/2}>
						<Layer  className="Dots">
							{ dots }
							{ cells }													
						</ Layer>
						<PolygonsContainer />					
						
						<Layer className="Background" />
				</ Stage>
			</div>
		)
	}
}