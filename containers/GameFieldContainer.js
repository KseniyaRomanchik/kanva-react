import React, { Component } from "react";
import * as actions from "../actions/actions";
import { connect } from "react-redux";

class GameFieldContainer extends Component{

	constructor(props) {
		super(props)
		// width
		// height	
		// step
	}

	render(){		

		// changeSizeInStoreEvent(){}

		return (
			<div className="Canvas">
				{/* layerRed */}
				{/* layerBlue */}
				{/* layerPolyRed */}
				{/* layerPolyBlue */}
			</div>
		)
	}
}

function mapStateToProps (state) {

	console.log(state.dots.dots)
	
	return {
		dots: state.dots.dots
	}
}

export default connect( mapStateToProps, {
		setDotColor: actions.setDotColor
	})(GameFieldContainer);

// connect store
