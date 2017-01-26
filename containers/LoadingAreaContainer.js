import React, {Component} from "react";
import * as actions from "../actions/actions";
import { connect } from "react-redux";

class LoadingAreaContainer extends Component{

	constructor(props) {
		super(props)
		// width
		// height			
	}

	render(){

		

		// changeSizeInStoreEvent(){}


		return (
			<div>
				{/* form component */}
			</div>
		)
	}
}

function mapStateToProps (state) {
	
	return {
		size: state.dots.size,
		dots: state.dots.dots
	}
}

export default connect( mapStateToProps, {
		loadStore: actions.loadStore
	})(LoadingAreaContainer);

// connect store
