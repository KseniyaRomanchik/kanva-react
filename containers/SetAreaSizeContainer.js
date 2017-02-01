import React, {Component} from "react";
import * as actions from "../actions/actions";
import { connect } from "react-redux";
import SetFieldSize from "./../components/SetFieldSize";

class SetAreaSizeContainer extends Component{

	constructor(props) {
		super(props)
		// width
		// height			
	}

	render(){

		

		// changeSizeInStoreEvent(){}


		return (
			<div>
				<SetFieldSize size={ this.props.size }
								step={ this.props.step }
								setFieldSize={ this.props.setFieldSize }
								/>
				{/* form component */}
			</div>
		)
	}
}

function mapStateToProps (state) {
	
	return {
		size: state.dots.fieldSize,
		step: state.dots.fieldSize.step
	}
}

export default connect( mapStateToProps, {
		setFieldSize: actions.setFieldSize
	})(SetAreaSizeContainer);

// connect store
