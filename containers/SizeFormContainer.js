import React, {Component} from "react";
import * as actions from "../actions/actions";
import { connect } from "react-redux";

class SizeFormContainer extends Component{

	constructor(props) {
		super(props);
					
	}

	render(){

		// refreshStoreEvent{}

		return (
			<div>
				{/* textareaComponent */}
			</div>
		)
	}
}

function mapStateToProps (state) {
	
	return {
		size: state.dots.size
	}
}

export default connect( mapStateToProps, {
		setFieldSize: actions.setFieldSize
	})(SizeFormContainer);


// connect store
