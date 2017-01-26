import React, {Component} from "react";
import * as actions from "../actions/actions";
import { connect } from "react-redux";
import SetPlayField from "./../components/SetPlayField";

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
				<SetPlayField />
				{/* form component */}
			</div>
		)
	}
}

function mapStateToProps (state) {
	
	return {
		size: state.dots.size,
		dots: state.dots.dots,
		step: state.dots.step
	}
}

export default connect( mapStateToProps, {
		loadStore: actions.loadStore
	})(LoadingAreaContainer);

// connect store
