import React, { Component } from "react";
import { Stage, Layer, Circle } from "react-konva";
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

		if(this.props.dots[id].color == ""){

			let newDot = this.setColor(this.props.dots[id]);

			this.props.setPlayer({ move : this.props.move ? 0 : 1 });
			this.props.setNewDotProperty(id, newDot);			
			this.setState({ clickedDot : this.props.dots[id] })
		}		
	}

	setColor(dotObj){

		dotObj.color = this.props.move;
		return dotObj;
	}

	render(){

		let dots = [],
			i = 0;

		for( let I in this.props.dots){

			i++
			dots.push(
				<Circle key={ i++ }
						radius={5}
						fill={ this.props.dots[I].color ? "red" : (this.props.dots[I].color === 0 ? "blue" : "#ddd" ) }
						x={ this.props.dots[I].x }
						y={ this.props.dots[I].y }
						onClick={ this.identyPlayer.bind(this) }
				/>)
		}

		return (
			<div>
				<h1><span className={ "player" + this.props.move }>Player { this.props.move }</span> move</h1>
				<Stage width={ this.props.width } height={ this.props.height }>
								{/* blue */}
					<Polygons player={1} 
								dots={ this.props.dots } 
								move={ this.props.move } 
								polygons={ this.props.polygons }
								step={ this.props.step } 
								clickedDot={ this.state.clickedDot } />
								{/* red */}
					{/* <Polygons player={0} 
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