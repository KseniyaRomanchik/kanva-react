import React, { Component } from "react";
import { Stage, Layer, Circle, Text } from "react-konva";
import Polygons from "./../components/Polygons"


export default class PlayField extends Component {

	constructor(props){
		super(props);
		this.state = {
			clickedDot: {}
		}
	}

	identyPlayer(e){

		let id = `id-${e.target.attrs.x}-${e.target.attrs.y}`;

		if(this.props.dots[id].color === ""){	
			
			let dotsid = Object.assign( {}, this.props.dots[id])
			// let dots = Object.assign( {}, this.props.dots )

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

			i++
			dots.push(
				<Circle key={ i++ }
						radius={5}
						stroke={ this.props.dots[I].color ? "red" : (this.props.dots[I].color === 0 ? "blue" : "#ddd" ) }
						x={ this.props.dots[I].x }
						y={ this.props.dots[I].y }
						text={ "d" + this.props.dots[I].d }
						onClick={ this.identyPlayer.bind(this) }
				><Text x={ this.props.dots[I].x }
						y={ this.props.dots[I].y } 
						fontSize={ 8 }
						text={ "d" + this.props.dots[I].d } /></ Circle>)
		}

		// console.log(this.props.dots)

		return (
			<div>
				<h1><span className={ "player" + this.props.move }>Player { this.props.move }</span> move</h1>
				<Stage width={ this.props.width } height={ this.props.height }>
								{/* blue */}
					<Polygons player={0} 
								dots={ this.props.dots } 
								move={ this.props.move } 
								polygons={ this.props.polygons }
								step={ this.props.step } 
								clickedDot={ this.state.clickedDot } />
								{/* red */}
					{/* <Polygons player={1} 
								dots={ this.props.dots } 
								move={ this.props.move } 
								polygons={ this.props.polygons }
								step={ this.props.step } 
	clickedDot={ this.state.clickedDot } /> */}
					<Layer className="Dots">
						{ dots }
					</ Layer>
					<Layer className="Background" />
				</ Stage>
			</div>
		)
	}
}