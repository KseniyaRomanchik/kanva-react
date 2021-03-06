import React, { Component } from "react";
import * as actions from "../actions/actions";
import { connect } from "react-redux";
import PlayField from "./../components/PlayField";

class GameFieldContainer extends Component{

	render(){		

		let width = this.props.size.width * this.props.step,
			height = this.props.size.height * this.props.step

		return (
			<div className="Canvas">
				<PlayField 
					width={ width } 
					height={ height } 
					dots={ this.props.dots } 
					setPlayer={ this.props.setPlayer }
					timer={ this.props.size.timer }  
					step={ this.props.step }
					setNewDotProperty={ this.props.setNewDotProperty }
					currentMove={this.props.currentMove}
					/>
			</div>
		)
	}
}

function mapStateToProps (state) {
	
	return {
		dots: state.dots.dots,
		size: state.dots.fieldSize,
		currentMove: state.dots.currentMove,
		step: state.dots.fieldSize.step
	}
}

export default connect( mapStateToProps, {
		setNewDotProperty: actions.setNewDotProperty,
		setPlayer: actions.setPlayer
	})(GameFieldContainer);
