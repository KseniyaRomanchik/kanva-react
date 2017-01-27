import React, { Component } from "react";
import * as actions from "../actions/actions";
import { connect } from "react-redux";
import PlayField from "./../components/PlayField";

class GameFieldContainer extends Component{

	constructor(props) {
		super(props)
		// width
		// height	
		// step
	}

	render(){		

		// changeSizeInStoreEvent(){}

		let width = this.props.size.width * this.props.step,
			height = this.props.size.height * this.props.step

		return (
			<div className="Canvas">
				<PlayField 
					width={ width } 
					height={ height } 
					dots={ this.props.dots } 
					polygons = { this.props.polygons }
					setPlayer={ this.props.setPlayer }  
					step={ this.props.step }
					setNewDotProperty={ this.props.setNewDotProperty }
					move={this.props.move}
					/>
			</div>
		)
	}
}

function mapStateToProps (state) {
	
	return {
		dots: state.dots.dots,
		size: state.dots.size,
		step: state.dots.step,
		move: state.dots.move,
		polygons: state.dots.polygons
	}
}

export default connect( mapStateToProps, {
		setNewDotProperty: actions.setNewDotProperty,
		setPlayer: actions.setPlayer
	})(GameFieldContainer);

// connect store
