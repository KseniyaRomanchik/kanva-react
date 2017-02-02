import React, {Component} from "react";
import * as actions from "../actions/actions";
import { connect } from "react-redux";
import SetFieldSize from "./../components/SetFieldSize";

class SetAreaSizeContainer extends Component{

	render(){

		return (
			<div>
				<SetFieldSize size={ this.props.size }
								step={ this.props.step }
								setFieldSize={ this.props.setFieldSize }
								setPolygon={ this.props.setPolygon }
								setEmptyPolygon={ this.props.setEmptyPolygon }
								/>
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
		setFieldSize: actions.setFieldSize,
		setPolygon: actions.setPolygon,
		setEmptyPolygon: actions.setEmptyPolygon
	})(SetAreaSizeContainer);

// connect store
