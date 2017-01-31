import React, { Component } from "react";
import { Stage, Layer, Circle } from "react-konva";
import Polygons from "./../components/Polygons"


export default class PlayField extends Component {

	constructor(props){
		super(props);
		this.state = {
			clickedDot: {}
		}

		this.props.dots["id-0-1"].color = 0;
		this.props.dots["id-0-2"].color = 0;
		this.props.dots["id-0-4"].color = 0;
		this.props.dots["id-2-1"].color = 0;
		this.props.dots["id-2-2"].color = 0;
		this.props.dots["id-2-4"].color = 0;
		this.props.dots["id-1-0"].color = 0;
		this.props.dots["id-1-1"].color = 0;
		this.props.dots["id-1-5"].color = 0;
		this.props.dots["id-1-2"].color = 1;
		this.props.dots["id-1-4"].color = 1;
	}

	identyPlayer(e){

		let id = `id-${e.target.attrs.x/this.props.step}-${e.target.attrs.y/this.props.step}`;

		if(this.props.dots[id].color === ""){	
			
			let dotsid = Object.assign( {}, this.props.dots[id])

			dotsid.color = this.props.move;
			dotsid.d = 0; 
			this.props.setPlayer({ move : this.props.move ? 0 : 1 });
			this.props.setNewDotProperty(dotsid, id);			
			this.setState({ clickedDot : dotsid });
		}		
	}

	render(){

		let dots = [],
			i = 0;
		for( let I in this.props.dots){

			dots.push(
				<Circle key={ i++ }
						radius={5}
						fill={ this.props.dots[I].color ? "red" : (this.props.dots[I].color === 0 ? "blue" : "#ddd" ) }
						x={ this.props.dots[I].x }
						y={ this.props.dots[I].y }
						onClick={ this.identyPlayer.bind(this) }
				></ Circle>)
				// <Text key={ i++ } 
				// 		x={ this.props.dots[I].x }
				// 		y={ this.props.dots[I].y } 
				// 		fill={ this.props.dots[I].color ? "red" : (this.props.dots[I].color === 0 ? "blue" : "#ddd" ) }
				// 		fontSize={ 10 }
				// 		text={ "d" + this.props.dots[I].d }
				// 		onClick={ this.identyPlayer.bind(this) } />)
		}

		// console.log(this.props.dots)

		return (
			<div>
				<h1><span className={ "player" + this.props.move }>Player { this.props.move }</span> move</h1>
				<Stage width={ this.props.width } height={ this.props.height }>
						<Layer x={this.props.step/2} y={this.props.step/2} className="Dots">
							{ dots }
						</ Layer>
									{/* blue */}
						<Polygons player={0} 
									dots={ this.props.dots } 
									move={ this.props.move } 
									polygons={ this.props.polygons }
									step={ this.props.step } 
									setNewDotProperty={ this.props.setNewDotProperty }
									clickedDot={ this.state.clickedDot.color ? {} : this.state.clickedDot } 
									setPolygons={ this.props.setPolygons }
									polygons = { this.props.polygons }/>
									{/* red */}
						{/* <Polygons player={1} 
									dots={ this.props.dots } 
									move={ this.props.move } 
									polygons={ this.props.polygons }
									step={ this.props.step } 
									clickedDot={ this.state.clickedDot ? this.state.clickedDot : {} } /> */}
						
						<Layer x={this.props.step/2} y={this.props.step/2} className="Background" />
				</ Stage>
			</div>
		)
	}
}